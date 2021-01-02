import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-login-modal',
  template: `
    <input nbInput shape="round" #name type="text"/>
    <button nbButton hero (click)="addUser()"></button>
`,
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  userData: any;

  constructor(private auth: AuthService, private dialogService: NbDialogService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.auth.signUp(this.name.nativeElement.value);
    this.closeModal();
  }

  closeModal(): void{
      this.dialogRef.close();
  }
}
