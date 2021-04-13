import { validateUser } from '../validation';
import { IUsers } from '../interface';
import { Id } from '../../../common/interface';
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

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export const findUsers = async () => {
  try {
    return await getRepository(Users).find();
  } catch (err) {
    throw err;
  }
};

/* const obtainInformationAboutCryptocurrencies = async (
  criptocurrency: ICryptoCurrent[],
  currency: string,
) => {
  const arrayCriptocurrency = [];

  for (const item of criptocurrency) {
    const response = await CoinGeckoClient.simple.price({
      ids: item.id,
      vs_currency: currency,
      order: 'market_cap_desc',
      sparkline: false,
      price_change_percentage: '1h',
    });
    //await CoinGeckoClient.coins.list(item.id);
    arrayCriptocurrency.push(response);
  }

  return await Promise.all(arrayCriptocurrency);
}; */

export const userInformation = async (payload: iPayload) => {
  try {
    const user = await getRepository(Users).findOne(payload.id);
    if (!user) throw NotFoundException('User not found');

    const response = await user.cryptocurrency.map(async (item) => {
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

    user.cryptocurrency = await Promise.all(response);

    return user;
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

/* let data = await CoinGeckoClient.simple.price({
    ids: ['bitcoin', 'ethereum'],
    vs_currencies: ['eur', 'usd'],
}); */
