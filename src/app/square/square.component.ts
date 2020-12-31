import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton hero [status]="currColor" #curCell (click)="randomColor()"></button>
  `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() value: string;
  @ViewChild('curCell', {static: true}) curCell: ElementRef;
  currColor = 'basic';

  randomColor(): void {
    const colors = ['primary', 'success', 'info', 'warning', 'danger'];
    this.currColor = colors[Math.floor(Math.random() * colors.length)];
  }


}
