import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationComponent } from './calculation.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('CalculationComponent', () => {
  let component: CalculationComponent;
  let fixture: ComponentFixture<CalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
