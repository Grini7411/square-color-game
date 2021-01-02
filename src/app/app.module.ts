import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbWindowModule,
  NbInputModule,
  NbDialogService,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {environment} from '../environments/environment';
import { LoginModalComponent } from './login-modal/login-modal.component';






@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    LoginModalComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NbThemeModule.forRoot({ name: 'cosmic' }),
      NbLayoutModule,
      NbWindowModule.forRoot(),
      NbInputModule,
      NbEvaIconsModule,
      NbButtonModule,
      NbDialogModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule
    ],
  providers: [NbDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
