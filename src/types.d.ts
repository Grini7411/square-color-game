export interface IUser {
  email: string;
  password?: string;
  createdAt: string;
}

export interface IGame {
  key?: string;
  host: IUser;
  joiner?: IUser;
  state: number;
  gameState: string[];
  createdAt: string;
}

