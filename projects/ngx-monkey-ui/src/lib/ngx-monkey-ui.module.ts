import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyButton } from './components/default/button/button.component';
import { MonkeyCard } from './components/default/card/card.component';

import { MonkeyBrutalistButton } from './components/brutalist/button/button.component';
import { MonkeyBrutalistCard } from './components/brutalist/card/card.component';
import { MonkeyFlatButton } from './components/flat/button/button.component';
import { MonkeyFlatCard } from './components/flat/card/card.component';
import { MonkeyGlassButton } from './components/glass/button/button.component';
import { MonkeyGlassCard } from './components/glass/card/card.component';
import { MonkeyGhostButton } from './components/ghost/button/button.component';
import { MonkeyGhostCard } from './components/ghost/card/card.component';

@NgModule({
  declarations: [
    // Default styles
    MonkeyButton,
    MonkeyCard,
    // Brutalist styles
    MonkeyBrutalistButton,
    MonkeyBrutalistCard,
    // Flat styles
    MonkeyFlatButton,
    MonkeyFlatCard,
    // Glass styles
    MonkeyGlassButton,
    MonkeyGlassCard,
    // Ghost styles
    MonkeyGhostButton,
    MonkeyGhostCard,
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
    // Flat styles
    MonkeyFlatButton,
    MonkeyFlatCard,
    // Glass styles
    MonkeyGlassButton,
    MonkeyGlassCard,
    // Ghost styles
    MonkeyGhostButton,
    MonkeyGhostCard,
  ]
})
export class NgxMonkeyUiModule { }
