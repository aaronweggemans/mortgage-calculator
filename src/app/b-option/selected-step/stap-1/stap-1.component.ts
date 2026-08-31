import { Component, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { form, FormField, maxDate, required, SchemaPathTree } from '@angular/forms/signals';

@Component({
  selector: 'app-stap-1',
  imports: [MatIcon, FormField],
  templateUrl: './stap-1.component.html',
})
export class Stap1Component {
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

  protected submitForm(): void {
    //  this.formError.emit(this.form().invalid());
    // this.formData.emit(this.form().value());
  }
}

interface DateAndStatus {
  dateOfBirth: Date | null;
  status: '';
}
