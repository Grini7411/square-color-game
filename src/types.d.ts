export interface IUser {
  email: string;
  password: string;
  cratedAt: string;
}

export interface IGame {
  key?: string;
  host: IUser;
  joiner?: IUser;
  state: number;
  createdAt: string;
}
