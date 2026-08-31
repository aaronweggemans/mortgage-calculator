import { Component, computed, input, output, signal, Signal } from '@angular/core';
import { Stap1Component } from './stap-1/stap-1.component';
import { Stap2Component } from './stap-2/stap-2.component';
import { Stap3Component } from './stap-3/stap-3.component';
import { Stap4Component } from './stap-4/stap-4.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-selected-step',
  imports: [
    Stap1Component,
    Stap2Component,
    Stap3Component,
    Stap4Component,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './selected-step.component.html',
})
export class SelectedStepComponent {
  public readonly step = input.required<number>();

  public readonly next = output<void>();
  public readonly previous = output<void>();
  public readonly resetFlow = output<void>();

  protected readonly header: Signal<HeaderProperties> = computed(() => {
    switch (this.step()) {
      case 0:
        return { title: 'Persoonlijke situatie', description: 'Vul uw persoonlijke gegevens in.' };
      case 1:
        return { title: 'Uw inkomen', description: 'Vul uw bruto jaar inkomen(s) in.' };
      case 2:
        return { title: 'Wonen', description: 'Vul uw huidige woonsituatie in.' };
      case 3:
        return {
          title: 'Uw maximale hypotheek',
          description: 'Op basis van de ingevulde gegevens is uw indicatie:',
        };
      default:
        return { title: 'Persoonlijke situatie', description: 'Vul uw persoonlijke gegevens in.' };
    }
  });

  protected readonly formModal = signal({
    brutoInkomen: 0,
    leeftijd: 20,
    partner: false,
    brutoInkomenPartner: 0,
    leeftijdPartner: 20,
    previousHouse: false,
    spaargeld: false,
    totaalGespaard: 0,
  });

  protected readonly form = form(this.formModal);
}

interface HeaderProperties {
  title: string;
  description: string;
}
