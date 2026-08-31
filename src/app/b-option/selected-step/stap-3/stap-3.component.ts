import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-stap-3',
  templateUrl: './stap-3.component.html',
})
export class Stap3Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();

  protected readonly hasEerderHuisGekocht = signal<boolean | null>(null);
}
