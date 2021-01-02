export interface IUser {
  uid: string;
  name: string;
  cratedAt: string;
}

export interface IGame {
  $key?: string;
  host: IUser;
  joiner?: IUser;
  state: number;
  createdAt: string;
}
