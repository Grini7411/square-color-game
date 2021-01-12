import {Component, Input, OnInit} from '@angular/core';
import {IGame} from '../../types';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-game-list',
  template: `
    <nb-card size="sm" style="width: 750px">
      <nb-card-header>
        Games
      </nb-card-header>
      <nb-list>
        <nb-list-item *ngFor="let game of games; let i = index">
          <div style="width: 100%">
            <span style="font-size: 1.5rem;">{{game.host?.email}}</span>
            <button nbButton outline status="success" style="float: right" [disabled]="!isUserLogged" (click)="joinGame($event, i)"> Join Game</button>
          </div>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @Input() games: IGame[];
  @Input() userLogged;
  isUserLogged: boolean;

  constructor(private gameServ: GameService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:curly
    if (this.userLogged) this.isUserLogged = true;
    if (this.isUserLogged) {

    }
  }

  joinGame($event, index: number): void {
    this.gameServ.joinGame(this.games[index].key);
  }

}
