export interface IUser {
  uid: string;
  name: string;
  sessionId: string;
}

export interface IGame {
  gid: string;
  hoster: IUser;
  joiner: IUser;
}
