import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIcon],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public readonly next = output<void>();
  public readonly previous = output<void>();
}
