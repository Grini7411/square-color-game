import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {IUser} from '../../types';
import {formatDate} from '@angular/common';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: any;
  constructor(private fireAuth: AngularFireAuth, private http: HttpClient, private db: AngularFireDatabase) { }

   async addUser(name: string): Promise<Observable<any>> {
     return await this.fireAuth.signInAnonymously()
       .then((r) => {
         const now: string = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
         const userToAdd: IUser = {
           uid: r.user.uid,
           name,
           cratedAt: now
         };
         this.userLogged = userToAdd;
         return this.http.post(environment.base_URL + 'users.json', userToAdd);
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
