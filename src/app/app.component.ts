import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NbDialogService} from '@nebular/theme';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignUpModalComponent} from './sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'square-color-game';
  player: string;

  constructor(private authServ: AuthService, private dialogService: NbDialogService) {

  }

  ngAfterViewInit(): void {
    // this.player =
  }

  openModal(isLoginModal: boolean): void {
    const modalToOpen: any = isLoginModal ? LoginModalComponent : SignUpModalComponent;
    this.dialogService.open(modalToOpen, {context: {isLoginModal}});
  }


}
