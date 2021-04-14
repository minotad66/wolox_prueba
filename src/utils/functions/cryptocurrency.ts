import { IResposnseCryptoCurrentList } from '../../modules/cryptocurrency/interface';
import { Users } from '../../modules/users/entity';

export const returnsTheUserPreferredCurrencyValue = (
  current_price: { [x: string]: number },
  user: Users | undefined,
) => {
  const price = [];

  for (const currency in current_price) {
    if (currency === 'ars') {
      price.push({ ars: current_price[currency] });
    }
    if (currency === 'usd') {
      price.push({ usd: current_price[currency] });
    }
    if (currency === 'eur') {
      price.push({ eur: current_price[currency] });
    }
  }

  return price;
};

export const cryptocurrencyList = (data: IResposnseCryptoCurrentList[], user: Users | undefined) =>
  data.map(
    (item: {
      id: string;
      symbol: string;
      name: string;
      image: object;
      market_data: { current_price: { [x: string]: number } };
      last_updated: Date;
    }) => {
      const { id, symbol, name, image, last_updated } = item;
      const price = returnsTheUserPreferredCurrencyValue(item.market_data.current_price, user);

      return { id, symbol, name, image, price, last_updated };
    },
  );
