import { Component, effect, output, signal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { form, FormField, maxDate, required, SchemaPathTree } from '@angular/forms/signals';

@Component({
  selector: 'app-stap-1',
  imports: [MatIcon, HeaderComponent, FooterComponent, FormField],
  templateUrl: './stap-1.component.html',
})
export class Stap1Component {
  private readonly footer = viewChild.required(FooterComponent);

  public readonly next = output<void>();

  private readonly dateAndStatusModal = signal<DateAndStatus>({
    dateOfBirth: null,
    status: '',
  });

  protected readonly form = form<DateAndStatus>(
    this.dateAndStatusModal,
    () => (schemaPath: SchemaPathTree<DateAndStatus>) => {
      required(schemaPath.dateOfBirth, { message: 'U moet hier een valide waarde invullen.' });
      maxDate(schemaPath.dateOfBirth, new Date(), {
        message: 'U kunt geen datum in de toekomst invullen.',
      });
      required(schemaPath.status, { message: 'U moet hier een valide waarde invullen.' });
    },
  );

  private readonly enableAndDisableNextButton = effect(() => {
    console.log(this.form().valid());
    if (this.footer().nextButton()) {
      this.footer().nextButton().nativeElement.disabled = this.form().valid();
    }
  });

  protected submitForm(): void {
    //  this.formError.emit(this.form().invalid());
    // this.formData.emit(this.form().value());
  }
}

interface DateAndStatus {
  dateOfBirth: Date | null;
  status: '';
}
