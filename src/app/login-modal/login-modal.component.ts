import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <input nbInput shape="round" #name type="text"/>
    <button nbButton hero status="primary" (click)="addUserAndStartGame()">Start Game!</button>
  `,
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  userData: any;

  constructor(private authServ: AuthService, private dialogService: NbDialogService, protected dialogRef: NbDialogRef<any>,
              private gameServ: GameService) { }

  ngOnInit(): void {
  }

  addUserAndStartGame(): void {
    this.authServ.addUser(this.name.nativeElement.value)
      .then(res => {
         return res.subscribe(() => {
           // create a game
           this.gameServ.onCreateGame(this.authServ.userLogged);
        });
    });
    this.closeModal();

  }

  closeModal(): void{
      this.dialogRef.close();
  }
}
