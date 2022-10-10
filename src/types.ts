interface IUser {
  id: number;
  name: string;
}

export type TradeType = 'buy' | 'sell';

export interface ITrade {
  type: TradeType;
  user: IUser;
  symbol: string;
  price: number;
  timestamp: string;
}

export interface ITradeResponse {
  id: number;
  type: TradeType;
  creatorId: number;
  symbol: string;
  price: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}
