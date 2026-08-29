import { Component, ElementRef, output, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIcon],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public readonly nextButton = viewChild.required<ElementRef<HTMLButtonElement>>('nextButton');

  public readonly next = output<void>();
  public readonly previous = output<void>();
}
