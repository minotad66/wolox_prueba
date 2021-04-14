import { getRepository } from 'typeorm';
import { Users } from '../../users/entity';
import { InternalServerErrorException, NotFoundException } from '../../../utils/errors';
import { iPayload } from '../../auth/interface';
import { Pagination } from '../interface';
import { validatePagination } from '../validation';
import { cryptocurrencyList } from '../../../utils/functions/cryptocurrency';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export const findListCryptocurrency = async (payload: iPayload, pagination: Pagination) => {
  try {
    const { orderBy, page } = validatePagination(pagination);
    const user = await getRepository(Users).findOne(payload.id);
    if (!user) throw NotFoundException('User not found');

    const responseCount = await CoinGeckoClient.coins.list();
    const qty = responseCount.data.length;

    const { data } = await CoinGeckoClient.coins.all({
      order: orderBy || 'id',
      per_page: 50,
      page: page || 1,
      localization: false,
      sparkline: false,
    });

    return { data: cryptocurrencyList(data, user), qty, pages: Math.ceil(qty / 50) };
  } catch (err) {
    throw InternalServerErrorException(err.name);
  }
};

export const cryptocurrencyUser = async (payload: iPayload, pagination: Pagination) => {
  const { orderBy, page, limit } = validatePagination(pagination);
  const order = orderBy == 'market_cap_asc' ? 'market_cap_asc' : 'market_cap_desc';

  try {
    const user = await getRepository(Users).findOne(payload.id);
    if (!user) throw NotFoundException('User not found');

    console.log(user);
    

    let { crypto } = user;

    const result = crypto.map((item) => item.id_crypto);
    const markets = await CoinGeckoClient.coins.markets({
      order,
      per_page: limit,
      page,
      localization: false,
      sparkline: false,
      vs_currency: user.currency,
      ids: result,
    });

    const responseCount = await CoinGeckoClient.coins.list();
    const qty = responseCount.data.length;

    const response = await markets.data.map(async (item) => {
      const { id, symbol, name, image, last_updated } = item;

      const { data } = await CoinGeckoClient.simple.price({
        ids: [id],
        vs_currencies: ['eur', 'usd', 'ars'],
      });

      return {
        id,
        symbol,
        name,
        image,
        last_updated,
        eur: data[id].eur,
        usd: data[id].usd,
        ars: data[id].ars,
      };
    });

    return { data: await Promise.all(response), qty, pages: Math.ceil(qty / limit) };
  } catch (err) {
    throw InternalServerErrorException(err.name);
  }
};
