import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  signUp(name: string): any {
    return this.auth.signInAnonymously()
      .then(() => {
        console.log(name, 'success!');
      });
  }
}
