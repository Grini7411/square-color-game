import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton hero [status]="currColor" #curCell (click)="randomColor()"></button>
  `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() value: string;
  @Input() index: number;
  @ViewChild('curCell', {static: true}) curCell: ElementRef;
  currColor = 'basic';

  constructor(private gameServ: GameService) {
  }

  randomColor(): void {
    const colors = ['primary', 'success', 'info', 'warning', 'danger'];
    this.currColor = colors[Math.floor(Math.random() * colors.length)];
    // Update current game color
    this.gameServ.updateGameState(this.index, this.value);
  }


}
