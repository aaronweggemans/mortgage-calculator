import { Component, HostBinding, input } from '@angular/core';
import { AOptionComponent } from './a-option/a-option.component';
import { BOptionComponent } from './b-option/b-option.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AOptionComponent, BOptionComponent],
})
export class AppComponent {
  public readonly option = input<Option>();

  public readonly primaryColor = input('#222356');
  public readonly secondaryColor = input('#81B4DE');
  public readonly tertiaryColor = input('#f5f5f8');

  @HostBinding('style.--app-primary')
  get primaryColorCss(): string {
    return this.primaryColor();
  }

  @HostBinding('style.--app-secondary')
  get secondaryColorCss(): string {
    return this.secondaryColor();
  }

  @HostBinding('style.--app-tertiary')
  get tertiaryColorCss(): string {
    return this.tertiaryColor();
  }
}

type Option = 'A' | 'B';
