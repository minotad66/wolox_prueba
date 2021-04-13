export interface ICryptoCurrentList {
  id: string;
  symbol: string;
  name: string;
  image: object;
  market_data: { current_price: { eur: number } };
  last_updated: Date;
}

export interface IResposnseCryptoCurrentList {
  id: string;
  symbol: string;
  name: string;
  image: object;
  market_data: { current_price: { [x: string]: number } };
  last_updated: Date;
}

export interface ICryptoCurrency {
  id: string;
  name: string;
}
