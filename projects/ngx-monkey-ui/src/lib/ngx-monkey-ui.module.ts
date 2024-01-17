import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyThemeChanger } from './components/theme-changer/theme-changer.component';

import { MonkeyButton } from './components/button/button.component';
import { MonkeyCard } from './components/card/card.component';
import { MonkeySwitch } from './components/switch/switch.component';
import { MonkeyCheckbox } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    MonkeyThemeChanger,

    MonkeyButton,
    MonkeyCard,
    MonkeySwitch,
    MonkeyCheckbox,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MonkeyThemeChanger,
    
    MonkeyButton,
    MonkeyCard,
    MonkeySwitch,
    MonkeyCheckbox,
  ]
})
export class NgxMonkeyUiModule { }
