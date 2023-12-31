import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyButton } from './components/default/button/button.component';
import { MonkeyCard } from './components/default/card/card.component';

import { MonkeyBrutalistButton } from './components/brutalist/button/button.component';
import { MonkeyBrutalistCard } from './components/brutalist/card/card.component';

@NgModule({
  declarations: [
    // Default styles
    MonkeyButton,
    MonkeyCard,
    // Brutalist styles
    MonkeyBrutalistButton,
    MonkeyBrutalistCard,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    // Default styles
    MonkeyButton,
    MonkeyCard,
    // Brutalist styles
    MonkeyBrutalistButton,
    MonkeyBrutalistCard,
  ]
})
export class NgxMonkeyUiModule { }
