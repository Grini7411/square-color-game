import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {IGame, IUser} from '../../types';
import {formatDate} from '@angular/common';
import firebase from 'firebase';
import database = firebase.database;
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';


export enum STATE {
  CREATED,
  JOINED,
  HOST_TURN,
  JOINER_TURN
}


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
      host: {
        email: currentUser.user.email,
        uid: currentUser.user.uid,
        createdAt: userCreatedAt
      },
      createdAt: now,
      state: STATE.CREATED,
      gameState: Array(9).fill('')
    };
    const ref = this.db.database.ref('games');
    ref.push().set(gameObj);
    if (!this.games) {
      return this.db.database.ref('/games').push(gameObj);
    }
    else {
      return this.games.push(gameObj);
    }
  }

  joinGame(gameId: string): void {
    const gameRef = this.db.database.ref('games').child(gameId);
    gameRef.transaction((game) => {
      if (!game.joiner) {
        game.state = STATE.JOINED;
        game.gameState = Array(9).fill('');
        game.joiner = {
          email: this.authServ.userLogged.value.user.email,
          createdAt: new Date(+JSON.parse(localStorage.getItem('user')).user.createdAt).toLocaleString()
        };
        gameRef.on('value', (snapshot) => {
          console.log(snapshot);
        });
      }
      return game;
    });
  }

  updateGame(gameId: string): Promise<void> {
    const ref = this.db.database.ref(`/games/${gameId}`);
    delete ref.key;
    const joiner: IUser = {
      email: this.authServ.userLogged.value.user.email,
      createdAt: new Date(+JSON.parse(localStorage.getItem('user')).user.createdAt).toLocaleString()
    };
    const objToUpdate: any = {
      joiner,
      status: 2
    };
    return ref.update(objToUpdate).then(value => {
      console.log(value);
    });
  }

  updateGameState(index: number, value: string): void {
    this.db.database.ref(`games`).on('child_changed', (snapshot) => {
    });
  }

  getExistingGame(key: string): AngularFireObject<IGame> {
    this.gameDetails = this.db.object('/games/' + key) as AngularFireObject<IGame>;
    return this.gameDetails;
  }
}
