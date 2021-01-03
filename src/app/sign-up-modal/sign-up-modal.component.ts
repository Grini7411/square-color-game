import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-sign-up-modal',
  template: `
    <nb-card>
    <nb-card-header>Sign-Up</nb-card-header>
    <nb-card-body>
      <input nbInput shape="round" placeholder="email" #email type="text"/>
      <input nbInput shape="round" placeholder="password" type="text" #password >
    </nb-card-body>
    <nb-card-footer>
      <button nbButton hero status="primary" (click)="addUser()">Sign-Up!</button>
    </nb-card-footer>
  </nb-card>`,
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  constructor(private authServ: AuthService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.authServ.newUser(this.email.nativeElement.value, this.password.nativeElement.value);
    this.closeModal();
  }

  closeModal(): void{
    this.dialogRef.close();
  }
}
