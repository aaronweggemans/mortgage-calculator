import { Component, output, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-stap-3',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './stap-3.component.html',
})
export class Stap3Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();

  protected readonly hasEerderHuisGekocht = signal<boolean | null>(null);
}
