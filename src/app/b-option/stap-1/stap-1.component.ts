import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stap-1',
  imports: [MatIcon],
  templateUrl: './stap-1.component.html',
})
export class Stap1Component {
  public readonly next = output<void>();

  public readonly warningContent = input<string>(
    'Deze bewerking is puur een indicatie en geen offerte. Wilt u persoonlijk advies, neem dan contact met ons op.\n U kunt contact met ons opnemen via de website, of bel naar 06-1594864',
  );
}
