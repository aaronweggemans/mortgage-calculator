import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stap2Component } from './stap-2.component';

describe('Stap2Component', () => {
  let component: Stap2Component;
  let fixture: ComponentFixture<Stap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stap2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Stap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
