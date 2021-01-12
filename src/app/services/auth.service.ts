import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IUser} from '../../types';
import {formatDate} from '@angular/common';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: BehaviorSubject<any> = new BehaviorSubject({});

  // readonly currentUser$: Observable<IUser>;
  constructor(private fireAuth: AngularFireAuth, private http: HttpClient, private db: AngularFireDatabase) {
  }

  newUser(email: string, password: string): Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        const now: string = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
        const userToAdd: IUser = {
          email,
          password,
          createdAt: now
        };
        // Add Additional info:
        this.login(email, password);
        this.db.list(`/users`).push(userToAdd);

      });
  }

  login(email: string, password: string): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.fireAuth.idToken.subscribe(token => {
          localStorage.setItem('loginToken', token);
        });
        this.userLogged.next(user);
        this.fireAuth.setPersistence('SESSION');
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
  logout(): void {
    this.fireAuth.signOut();
  }
}
