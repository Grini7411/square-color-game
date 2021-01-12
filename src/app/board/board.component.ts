import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../services/game.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChild('board') board;
  squares: string[];
  curPlayer: { uid: string, email: string } = {uid: '', email: ''};
  @Input() isUserLoggedIn: boolean;
  curGame: string;
  gameStatus: string;

  constructor(private authServ: AuthService, private gameServ: GameService) {}

  ngOnInit(): void {
  }

  newGame(): void {
    this.curGame = this.gameServ.createGame().key;
    // Wait for an opponent
    if (this.curGame) {
      this.gameStatus = 'Waiting for another player to join';
      // this.
    }
    // close the modal and start play
    this.fillSquares();
  }
  fillSquares(): void {
    this.squares = Array(9).fill(null);
  }
}
