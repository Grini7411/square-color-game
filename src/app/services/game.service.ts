import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {IGame, IUser} from '../../types';
import {formatDate} from '@angular/common';
import firebase from 'firebase';
import database = firebase.database;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameDetails: AngularFireObject<IGame>;
  games: AngularFireList<IGame>;
  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getAllGames(): AngularFireList<IGame> {
    this.games = this.db.list('/games') as AngularFireList<IGame>;
    return this.games;
  }

  onCreateGame(host: IUser): database.ThenableReference {
    const now: string = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
    const gameObj: IGame = {
      host,
      createdAt: now,
      state: 1
    };
    if (!this.games) {
      return this.db.database.ref('/games').push(gameObj);
    }
    else {
      return this.games.push(gameObj);

    }
    }

  getExistingGame(key: string): AngularFireObject<IGame> {
    this.gameDetails = this.db.object('/game/' + key) as AngularFireObject<IGame>;
    return this.gameDetails;
  }

  updateGame(game: IGame, userJoining: IUser): Promise<void> {
    if (this.games == null) {
      const reference = this.db.database.ref('/games/' + game.$key);
      delete game.$key; // You should delete this otherwise the update call will fail
      return reference.update({
        ...game,
        joiner: userJoining
      });
    }
    else {
      return this.games.update(game.$key, {
        ...game,
        joiner: userJoining
      });
    }
  }

}
