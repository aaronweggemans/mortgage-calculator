import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatIcon],
  templateUrl: './card.component.html',
})
export class CardComponent {
  public readonly title = input.required<string>();
  public readonly subtitle = input.required<string>();
  public readonly icon = input.required<string>();
}
