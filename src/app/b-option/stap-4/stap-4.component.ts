import { Component, output } from '@angular/core';

@Component({
  selector: 'app-stap-4',
  imports: [],
  templateUrl: './stap-4.component.html',
  styleUrl: './stap-4.component.scss',
})
export class Stap4Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();
}
