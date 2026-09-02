import { Directive, effect, model, OnDestroy, output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

/**
 * StepBase is a base class for all steps in the `selected-step` component.
 * It is a `@Directive` because it has implementations of Angular features such as model(), output() and effect().
 * The concrete class that you actually render is the `@Component()`.
 */
@Directive()
export abstract class StepBase<FormInterface extends object> implements OnDestroy {
  public readonly data = model.required<FormInterface>();
  public readonly nextButtonValidity = output<boolean>();

  protected abstract readonly form: FieldTree<FormInterface>;

  private readonly updateInvalidState = effect(() => {
    this.nextButtonValidity.emit(this.form().invalid());
  });

  ngOnDestroy(): void {
    this.nextButtonValidity.emit(true);
  }
}
