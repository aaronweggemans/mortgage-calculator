import { Component, output, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stap-4',
  templateUrl: './stap-4.component.html',
  styleUrl: './stap-4.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [MatIcon],
})
export class Stap4Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();
}
