import { validateUser } from '../validation';
import { Icrypto, IUsers } from '../interface';
import { getRepository } from 'typeorm';
import { Users } from '../entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UniqueViolation,
} from '../../../utils/errors';
import { hash } from 'bcrypt';
import { iPayload } from 'modules/auth/interface';
import { returnsTheUserPreferredCurrencyValue } from '../../../utils/functions/cryptocurrency';
import { CryptoCurrency } from '../../cryptocurrency/entity';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export const userInformation = async (payload: iPayload) => {
  try {
    const user = await getRepository(Users).findOne(payload.id, { relations: ['crypto'] });
    if (!user) throw NotFoundException('User not found');

    const arrayCryptoCurrent = await user.crypto.map(async (item) => {
      const { data } = await CoinGeckoClient.coins.fetch(item.id_crypto, {
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        localization: true,
        sparkline: false,
      });

      return {
        id: data.id_crypto,
        symbol: data.symbol,
        name: data.name,
        description: data.description.es,
        image: data.image,
        price: returnsTheUserPreferredCurrencyValue(data.market_data.current_price, user),
        last_updated: data.last_updated,
      };
    });

    const cryptocurrency = await Promise.all(arrayCryptoCurrent);

    return { ...user, cryptocurrency };
  } catch (err) {
    throw err;
  }
};

export const saveUsers = async (body: IUsers) => {
  try {
    const { password, ...user }: IUsers = validateUser(body);
    const passwordHash = await hash(password, 10);

    const newUser = getRepository(Users).create({ ...user, password: passwordHash });
    const userSaved = await getRepository(Users).save(newUser);

    if (!userSaved) {
      throw InternalServerErrorException('Problem to create a user. Try again.');
    }

    delete userSaved.password;

    return userSaved;
  } catch (err) {
    if (err.code === '23505' || '23502') {
      throw UniqueViolation(err.name);
    }
    throw err;
  }
};

export const addCryptocurrencies = async (data: Icrypto[], payload: iPayload) => {
  try {
    const response = await data.map(async (item) => {
      const crypto = await getRepository(CryptoCurrency).findOne({
        where: { id_crypto: item.id_crypto },
      });

      return !crypto ? await getRepository(CryptoCurrency).save(item) : crypto;
    });

    const user = await getRepository(Users).findOne(payload.id);
    user.crypto = await Promise.all(response);

    return await getRepository(Users).save(user);
  } catch (err) {
    throw err;
  }
};
