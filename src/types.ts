interface IUser {
  id: number;
  name: string;
}

export interface ITrade {
  type: 'buy' | 'sell';
  user: IUser;
  symbol: string;
  price: number;
  timestamp: string;
}
