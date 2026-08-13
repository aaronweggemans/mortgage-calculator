import { BrowserModule, createApplication } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@angular/elements';

createApplication({
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
      MatStepperModule,
      MatSlideToggleModule,
      MatButtonModule,
      MatIconModule,
      MatButtonToggleModule,
    ),
  ],
})
  .then((app) => {
    const element = createCustomElement(AppComponent, { injector: app.injector });

    if (!customElements.get('wp-mortgage-calculator')) {
      customElements.define('wp-mortgage-calculator', element);
    }
  })
  .catch((err) => console.error(err));
