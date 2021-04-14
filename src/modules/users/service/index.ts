import { validateUser } from '../validation';
import { IUsers } from '../interface';
import { Id } from '../../../common/interface';
import { getConnection, getRepository } from 'typeorm';
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

export const findUsers = async () => {
  try {
    return await getRepository(Users).find({ relations: ['crypto'] });
  } catch (err) {
    throw err;
  }
};

export const userInformation = async (payload: iPayload) => {
  try {
    const user = await getRepository(Users).findOne(payload.id, { relations: ['crypto'] });
    if (!user) throw NotFoundException('User not found');

    const responseCryptocurrency = await getRepository(CryptoCurrency).find({
      where: { idUser: payload.id },
    });

    const arrayCryptoCurrent = await responseCryptocurrency.map(async (item) => {
      const { data } = await CoinGeckoClient.coins.fetch(item.id, {
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        localization: true,
        sparkline: false,
      });

      return {
        id: data.id,
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

export const updateUsers = async (body: IUsers, params: Id) => {
  try {
    const { password, ...user }: IUsers = validateUser(body);
    const passwordHash = await hash(password, 10);

    await getRepository(Users).update(params.id, { ...user, password: passwordHash });
    const updatedUser = await getRepository(Users).findOne(params.id);

    if (!updatedUser) {
      throw NotFoundException('User not found');
    }

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

export const removeUsers = async (params: Id) => {
  try {
    const deleteUser = await getRepository(Users).delete(params.id);

    if (!deleteUser) {
      throw NotFoundException('User not found');
    }

    return {
      message: `The user with the id: ${params.id}, was successfully removed`,
    };
  } catch (err) {
    throw err;
  }
};
export const addCryptocurrencies = async (data: any, payload: iPayload) => {
  try {
    const response = await data.map(async (item) => {
      const crypto = await getRepository(CryptoCurrency).findOne(item.id);

      if (!crypto) {
        return await getRepository(CryptoCurrency).save(item);
      } else {
        return crypto;
      }
    });

    const user = await getRepository(Users).findOne(payload.id);
    user.crypto = await Promise.all(response);

    return await getRepository(Users).save(user);
  } catch (err) {
    console.error(err);
  }
};
/* user.crypto = [
      {
        id_crypto: 'bitcoin',
        symbol: 'bit',
        priceArgentine: 1231,
        priceDollars: 453,
        priceEuros: 43256,
        name: 'Bitcoin',
        image: ['mwoowmwomcomwmcowicm'],
        lastUpdateDate: new Date('2021-04-13'),
      }, 
    ];*/
