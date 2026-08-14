import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stap4Component } from './stap-4.component';

describe('Stap4Component', () => {
  let component: Stap4Component;
  let fixture: ComponentFixture<Stap4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stap4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Stap4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
