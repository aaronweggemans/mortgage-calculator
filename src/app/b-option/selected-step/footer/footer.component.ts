import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIcon],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public readonly showButtons = input<boolean>(true);
  // Not used but for future use
  public readonly showSeparator = input<boolean>(true);
  // Not used but for future use
  public readonly showDisclaimer = input<boolean>(true);

  public readonly nextDisabled = input<boolean>(false);
  public readonly previousDisabled = input<boolean>(false);

  public readonly next = output<void>();
  public readonly previous = output<void>();
}
