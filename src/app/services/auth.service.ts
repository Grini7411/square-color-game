import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IUser} from '../../types';
import {formatDate} from '@angular/common';
import {AngularFireDatabase} from '@angular/fire/database';
import firebase from 'firebase';
import ThenableReference = firebase.database.ThenableReference;
import Reference = firebase.database.Reference;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private fireAuth: AngularFireAuth, private http: HttpClient, private db: AngularFireDatabase) { }

  newUser(email: string, password: string): Promise<ThenableReference | Reference> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        const now: string = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
        const userToAdd: IUser = {
          email,
          password,
          cratedAt: now
        };
        // Add Additional info:
        // user.additionalUserInfo()
        this.login(email, password);
        return this.db.list(`/users`).push(userToAdd);
      });
  }

  login(email: string, password: string): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userLogged.next(user);
        this.userLogged.subscribe(userSub => console.log(userSub));
      });
  }
  getUserById(id: string): Subscription {
    return this.db.object(`users/${id}`).snapshotChanges().subscribe(action => {
      const $key = action.payload.key;
      const data = action.payload.val();
      return {$key, data};
    });
  }
}
