import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stap-3',
  imports: [MatIcon],
  templateUrl: './stap-3.component.html',
  styleUrl: './stap-3.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Stap3Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();

  protected readonly hasEerderHuisGekocht = signal<boolean | null>(null);
}
