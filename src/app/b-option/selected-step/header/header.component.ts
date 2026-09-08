import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly step = input.required<number>();
}
