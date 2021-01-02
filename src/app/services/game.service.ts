import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AngularFireModule} from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private fire: AngularFireModule) { }

  onCreateGame(): Observable<any> {
    const game = {
      host: 'Ben',
      joiner: 'Gen',
    };
    return this.http.post(environment.base_URL + 'games.json', game);
  }
}
