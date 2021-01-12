import { Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NbDialogService} from '@nebular/theme';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignUpModalComponent} from './sign-up-modal/sign-up-modal.component';
import {GameService} from './services/game.service';
import {IGame} from '../types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'square-color-game';
  player: string;
  isUserLogged: boolean;
  curPlayer: { uid: any; email: any };
  games: IGame[];

  constructor(private authServ: AuthService, private gameServ: GameService, private dialogService: NbDialogService) {

  }

  openModal(isLoginModal: boolean): void {
    const modalToOpen: any = isLoginModal ? LoginModalComponent : SignUpModalComponent;
    this.dialogService.open(modalToOpen, {context: {isLoginModal}});
  }

  ngOnInit(): void {

    this.authServ.userLogged.subscribe(user => {
      if (Object.keys(this.authServ.userLogged.value).length > 1) {
        this.isUserLogged = true;
        this.curPlayer = {email: user.user.email, uid: user.user.uid};
        this.gameServ.getAllGames().snapshotChanges().subscribe(data => {
          // tslint:disable-next-line:no-shadowed-variable
          this.games = data.map(game => {
            const payLoadObj = game.payload.val();
            if (payLoadObj.host.email !== this.authServ.userLogged.getValue().email){
              return {key: game.payload.key, state: payLoadObj.state, createdAt: payLoadObj.createdAt, host: payLoadObj.host,
                gameState: payLoadObj.gameState};
            }
          });
        });
      }
    });


  }


}

