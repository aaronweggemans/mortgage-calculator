import { Component, HostBinding, input } from '@angular/core';
import { AOptionComponent } from './a-option/a-option.component';
import { BOptionComponent } from './b-option/b-option.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AOptionComponent, BOptionComponent],
})
export class AppComponent {
  readonly option = input<Option>();

  readonly primaryColor = input('#222356');
  readonly secondaryColor = input('#81B4DE');
  readonly tertiaryColor = input('#f5f5f8');

  @HostBinding('style.--app-primary')
  get primaryColorCss(): string {
    return this.primaryColor();
  }

  @HostBinding('style.--app-secondary')
  get secondaryColorCss(): string {
    return this.secondaryColor();
  }
}

type Option = 'A' | 'B';
