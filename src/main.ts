import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

createApplication()
  .then((app) => {
    const element = createCustomElement(AppComponent, { injector: app.injector });

    if (!customElements.get('wp-mortgage-calculator')) {
      customElements.define('wp-mortgage-calculator', element);
    }
  })
  .catch((err) => console.error(err));
