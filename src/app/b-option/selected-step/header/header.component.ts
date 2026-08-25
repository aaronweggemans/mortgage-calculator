import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly title = input.required<string>();
  public readonly subtitle = input.required<string>();
  public readonly step = input.required<number>();
}
