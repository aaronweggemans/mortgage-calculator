import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeNl from '@angular/common/locales/nl';

registerLocaleData(localeNl, 'nl');

createApplication({
  providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
})
  .then((app) => {
    const element = createCustomElement(AppComponent, { injector: app.injector });

    if (!customElements.get('ewfwp-mortgage-calculator-app')) {
      customElements.define('ewfwp-mortgage-calculator-app', element);
    }
  })
  .catch((err) => console.error(err));
