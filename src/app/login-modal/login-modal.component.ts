import {ApplicationRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-login-modal',
  template: `
      <nb-card>
        <nb-card-header>Login</nb-card-header>
        <nb-card-body>
          <input nbInput shape="round" placeholder="email" #email type="text"/>
          <input nbInput shape="round" placeholder="password" type="text" #password >
        </nb-card-body>
        <nb-card-footer>
          <button nbButton hero status="primary" (click)="login()">Log-In!</button>
        </nb-card-footer>
      </nb-card>
  `,
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  userData: any;
  title: string;

  constructor(private authServ: AuthService, private dialogService: NbDialogService, protected dialogRef: NbDialogRef<any>,
              private gameServ: GameService, private appRef: ApplicationRef) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authServ.login(this.email.nativeElement.value, this.password.nativeElement.value).then(() => {
      this.appRef.tick();
    });
    this.closeModal();
  }

  closeModal(): void{
      this.dialogRef.close();
  }
}
