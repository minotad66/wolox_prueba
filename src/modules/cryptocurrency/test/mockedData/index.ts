export const mockedDataUser = {
  body: {
    name: 'Armando',
    lastName: 'Casas',
    username: 'Armando12',
    password: 'password1',
    currency: 'Dolares',
    crypto: [{ id_crypto: 'bitcoin' }],
  },

  user: {
    id: 1,
    name: 'ArmandoCasas',
    username: 'Armando1',
    iat: 1618152543,
    exp: 1618152586,
  },

  query: {
    page: 1,
    limit: 25,
    orderBy: 'id',
  },

  params: {
    id: 1,
  },

  markets: [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      current_price: 62413,
      last_updated: '2021-04-14T18:43:18.156Z',
    },
  ],

  price: {
    bitcoin: {
      usd: 62180,
      eur: 51925,
      ars: 5762924,
    },
  },
};
