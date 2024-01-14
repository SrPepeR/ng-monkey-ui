import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyThemeChanger } from './components/theme-changer/theme-changer.component';

import { MonkeyButton } from './components/button/button.component';
import { MonkeyCard } from './components/card/card.component';
import { MonkeySwitch } from './components/switch/switch.component';

@NgModule({
  declarations: [
    MonkeyThemeChanger,

    MonkeyButton,
    MonkeyCard,
    MonkeySwitch,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MonkeyThemeChanger,
    
    MonkeyButton,
    MonkeyCard,
    MonkeySwitch,
  ]
})
export class NgxMonkeyUiModule { }
