import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly step = input.required<number>();
  readonly next = output<void>();
  readonly previous = output<void>();
  readonly resetFlow = output<void>();

  private readonly focus = afterRenderEffect(this.focusOnTheFirstElement.bind(this));
  protected readonly header = computed(this.headerProperties.bind(this));
  protected readonly isFormInvalid = signal<boolean>(true);

  protected readonly personal = signal<PersonalForm>({ dateOfBirth: null, status: '' });
  protected readonly incomeAndPartner = signal<IncomeAndPartnerForm>({
    income: 30000,
    incomePartner: 30000,
    partner: null,
  });
  protected readonly living = signal<LivingForm>({ debt: 0, previousHouse: false, savings: 0 });

  private focusOnTheFirstElement(): void {
    if (this.step()) {
      this.elementRef.nativeElement.querySelector('input, button, select')?.focus();
    }
  }

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
