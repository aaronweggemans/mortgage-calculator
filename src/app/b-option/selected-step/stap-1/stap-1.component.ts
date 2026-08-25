import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-stap-1',
  imports: [MatIcon, HeaderComponent, FooterComponent],
  templateUrl: './stap-1.component.html',
})
export class Stap1Component {
  public readonly next = output<void>();
}
