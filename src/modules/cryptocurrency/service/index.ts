import { getRepository } from 'typeorm';
import { Users } from '../../users/entity';
import { InternalServerErrorException, NotFoundException } from '../../../utils/errors';
import { iPayload } from '../../auth/interface';
import { cryptocurrencyList } from '../../../utils/functions/cryptocurrency';
import { ICryptoCurrency } from '../interface';
import { validateCriptoCurrecy } from '../validation';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export const findListCryptocurrency = async (payload: iPayload) => {
  try {
    const user = await getRepository(Users).findOne(payload.id);
    if (!user) throw NotFoundException('User not found');

    const { data } = await CoinGeckoClient.coins.all();

    return cryptocurrencyList(data, user);
  } catch (err) {
    throw InternalServerErrorException(err.name);
  }
};

export const saveCryptocurrency = async (data: ICryptoCurrency[], payload: iPayload) => {
  try {
    const cryptocurrency: ICryptoCurrency[] = validateCriptoCurrecy(data);
    const user = await getRepository(Users).update(payload.id, { cryptocurrency });
    return user;
  } catch (err) {
    throw err;
  }
};
