import {Component, OnInit, ViewChild} from '@angular/core';
import { NbDialogService} from '@nebular/theme';
import {GameService} from '../services/game.service';
import {IGame} from '../../types';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChild('board') board;
  squares: string[];
  curPlayer: { uid: string, email: string };
  games: IGame[] = [];
  isUserLogged: boolean;
  curGame: string;

  constructor(private dialogService: NbDialogService, private authServ: AuthService, private gameServ: GameService) {}

  ngOnInit(): void {
    this.gameServ.getAllGames().valueChanges().subscribe(games => {
      games.forEach(game => this.games.push(game));
    });
    this.authServ.userLogged.subscribe(user => {
      if (Object.keys(this.authServ.userLogged.value).length > 1) {
        this.isUserLogged = true;
        this.curPlayer = {email: user.user.email, uid: user.user.uid};
      }
    });
  }

  newGame(): void {

    this.curGame = this.gameServ.createGame().key;
    // Wait for an opponent
    // close the modal and start play
    this.fillSquares();
  }

  joinGame(gameId: string): void {
    this.gameServ.updateGame(gameId);
  }

  fillSquares(): void {
    this.squares = Array(9).fill(null);
  }
}
