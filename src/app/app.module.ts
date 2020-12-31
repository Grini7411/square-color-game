import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NbThemeModule.forRoot({ name: 'cosmic' }),
      NbLayoutModule,
      NbEvaIconsModule,
      NbButtonModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
