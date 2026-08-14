import { Component, input } from '@angular/core';
import { AOptionComponent } from './a-option/a-option.component';
import { BOptionComponent } from './b-option/b-option.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AOptionComponent, BOptionComponent],
})
export class AppComponent {
  public readonly option = input<Option>();
}

type Option = 'A' | 'B';
