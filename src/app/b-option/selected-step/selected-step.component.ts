import { Component, computed, input, output, signal, Signal } from '@angular/core';
import { Stap1Component } from './stap-1/stap-1.component';
import { Stap2Component } from './stap-2/stap-2.component';
import { Stap3Component } from './stap-3/stap-3.component';
import { Stap4Component } from './stap-4/stap-4.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {
  HeaderProperties,
  IncomeAndPartnerForm,
  LivingForm,
  PersonalForm,
} from './selected-step.models';

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

  protected readonly isFormInvalid = signal<boolean>(true);

  public readonly next = output<void>();
  public readonly previous = output<void>();
  public readonly resetFlow = output<void>();

  protected readonly header: Signal<HeaderProperties> = computed(this.headerProperties.bind(this));

  protected personal = signal<PersonalForm>({ dateOfBirth: null, status: '' });
  protected incomeAndPartner = signal<IncomeAndPartnerForm>({
    income: 30000,
    incomePartner: 30000,
    partner: null,
  });
  protected living = signal<LivingForm>({ debt: 0, previousHouse: false, savings: 0 });

  private headerProperties(): HeaderProperties {
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
  }
}
