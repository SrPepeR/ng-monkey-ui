import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyButton } from './components/button/button.component';
import { MonkeyCard } from './components/card/card.component';

import { MonkeyThemeChanger } from './components/theme-changer/theme-changer.component';

@NgModule({
  declarations: [
    MonkeyButton,
    MonkeyCard,
    // Default styles
    MonkeyThemeChanger,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MonkeyButton,
    MonkeyCard,
    // Default styles
    MonkeyThemeChanger,
  ]
})
export class NgxMonkeyUiModule { }
