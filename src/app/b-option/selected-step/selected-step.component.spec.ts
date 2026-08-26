import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SelectedStepComponent } from './selected-step.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { Stap1Component } from './stap-1/stap-1.component';
import { MockComponent, Type } from 'ng-mocks';
import { Stap2Component } from './stap-2/stap-2.component';
import { Stap3Component } from './stap-3/stap-3.component';
import { Stap4Component } from './stap-4/stap-4.component';

describe('SelectedStepComponent', () => {
  let spectator: Spectator<SelectedStepComponent>;

  const createComponent = createComponentFactory({
    component: SelectedStepComponent,
    componentImports: [
      [Stap1Component, MockComponent(Stap1Component)],
      [Stap2Component, MockComponent(Stap2Component)],
      [Stap3Component, MockComponent(Stap3Component)],
      [Stap4Component, MockComponent(Stap4Component)],
    ],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { step: 0 } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially show the first step', () => {
    expect(spectator.query(Stap1Component)).toExist();
  });

  it.each([
    { step: 0, component: Stap1Component },
    { step: 1, component: Stap2Component },
    { step: 2, component: Stap3Component },
    { step: 3, component: Stap4Component },
  ])(
    'should show every component based on the step input',
    (item: StepCase<Stap1Component | Stap2Component | Stap3Component | Stap4Component>) => {
      spectator.setInput('step', item.step);
      expect(spectator.query(item.component)).toExist();
    },
  );

  it.each([
    { step: 0, component: Stap1Component },
    { step: 1, component: Stap2Component },
    { step: 2, component: Stap3Component },
  ])('should emit next when next is called from the component', ({ step, component }) => {
    spectator.setInput('step', step);
    const spyOnNext = vi.spyOn(spectator.component.next, 'emit');
    spectator.query(component as Type<any>)?.next.emit();
    expect(spyOnNext).toHaveBeenCalled();
  });

  it.each([
    { step: 1, component: Stap2Component },
    { step: 2, component: Stap3Component },
  ])(
    'should emit previous when previous is called from these components',
    ({ step, component }) => {
      spectator.setInput('step', step);
      const spyOnPrevious = vi.spyOn(spectator.component.previous, 'emit');
      spectator.query(component as Type<any>)?.previous.emit();
      expect(spyOnPrevious).toHaveBeenCalled();
    },
  );

  it('should emit resetFlow when the last component emits reset flow', () => {
    spectator.setInput('step', 3);
    const spyOnResetFlow = vi.spyOn(spectator.component.resetFlow, 'emit');
    spectator.query(Stap4Component)?.resetFlow.emit();
    expect(spyOnResetFlow).toHaveBeenCalled();
  });
});

interface StepCase<T> {
  step: number;
  component: Type<T>;
}
