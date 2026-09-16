import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIcon],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly showButtons = input<boolean>(true);

  readonly hidePrevious = input(false);
  readonly hideNext = input(false);

  readonly nextDisabled = input<boolean>(false);
  readonly previousDisabled = input<boolean>(false);

  readonly next = output<void>();
  readonly previous = output<void>();
}
