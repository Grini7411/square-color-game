import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {IGame} from '../../types';
import {formatDate} from '@angular/common';
import firebase from 'firebase';
import database = firebase.database;
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameDetails: AngularFireObject<IGame>;
  games: AngularFireList<IGame>;
  constructor(private http: HttpClient, private db: AngularFireDatabase, private fireAuth: AngularFireAuth,
              private authServ: AuthService) { }

  getAllGames(): AngularFireList<IGame> {
    this.games = this.db.list('/games') as AngularFireList<IGame>;
    return this.games;
  }

  createGame(): database.ThenableReference {
    const now: string = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
    const currentUser: any = this.authServ.userLogged.getValue();
    const userCreatedAt: string = new Date(+JSON.parse(localStorage.getItem('user')).user.createdAt).toLocaleString();
    const gameObj: any = {
      host: {email: currentUser.user.email,
             uid: currentUser.user.uid,
             createdAt: userCreatedAt
      },
      createdAt: now,
      state: 1,
    };
    if (!this.games) {
      return this.db.database.ref('/games').push(gameObj);
    }
    else {
      return this.games.push(gameObj);
    }
  }

  updateGame(gameId: string): Promise<void> {
    const currentUser = this.fireAuth.currentUser;
    const reference = this.db.database.ref(`/games/${gameId}`);
    delete reference.key;
    const objToUpdate = {
      key: gameId
    };
    return reference.update(objToUpdate);
  }


  getExistingGame(key: string): AngularFireObject<IGame> {
    this.gameDetails = this.db.object('/games/' + key) as AngularFireObject<IGame>;
    return this.gameDetails;
  }

}
