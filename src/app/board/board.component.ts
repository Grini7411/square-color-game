import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NbDialogService} from '@nebular/theme';
import {LoginModalComponent} from '../login-modal/login-modal.component';



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
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
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

  joinGame(): void {

  }
}
