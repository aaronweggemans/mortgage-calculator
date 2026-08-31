import { Component, output } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-stap-4',
  templateUrl: './stap-4.component.html',
  imports: [CardComponent],
})
export class Stap4Component {
  public readonly resetFlow = output<void>();

  protected navigate(): void {
    window.location.href = window.location.hostname + '/contact';
  }
}
