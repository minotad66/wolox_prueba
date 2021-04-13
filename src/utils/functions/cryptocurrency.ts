import { IResposnseCryptoCurrentList } from '../../modules/cryptocurrency/interface';
import { Users } from '../../modules/users/entity';

export const returnsTheUserPreferredCurrencyValue = (
  current_price: { [x: string]: number },
  user: Users | undefined,
) => {
  const price = [];
  for (const currency in current_price) {
    if (currency === user?.currency) {
      price.push(current_price[currency]);
    }
  }

  return price[0];
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
