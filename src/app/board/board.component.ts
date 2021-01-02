import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NbDialogService} from '@nebular/theme';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {GameService} from '../services/game.service';
import {IGame} from '../../types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  @ViewChild('board') board;
  squares: string[];
  curPlayer: string;
  games: IGame[] = [];
  constructor(private dialogService: NbDialogService, private gameServ: GameService) {}

  ngOnInit(): void {
    this.gameServ.getAllGames().valueChanges().subscribe(games => {
      games.forEach(game => this.games.push(game));
    });
  }

  newGame(): void {
    // Open Modal with name
    this.openLoginModal();
    // Wait for an opponent
    // close the modal and start play
    this.squares = Array(9).fill(null);
  }

  openLoginModal(): void {
    this.dialogService.open(LoginModalComponent, {});
  }

  joinGame(id: string): void {

  }
}
