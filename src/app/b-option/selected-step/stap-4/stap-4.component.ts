import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-stap-4',
  templateUrl: './stap-4.component.html',
  imports: [MatIcon, HeaderComponent],
})
export class Stap4Component {
  public readonly resetFlow = output<void>();

  protected navigate(): void {
    window.location.href = '';
  }
}
