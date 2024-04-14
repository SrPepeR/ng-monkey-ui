import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeyThemeChanger } from './components/theme-changer/theme-changer.component';

import { MonkeyButton } from './components/button/button.component';
import { MonkeyCard } from './components/card/card.component';
import { MonkeySwitch } from './components/switch/switch.component';
import { MonkeyCheckbox } from './components/checkbox/checkbox.component';
import { MonkeyLoader } from './components/loader/loader.component';
import { MonkeyImage } from './components/image/image.component';
import { MonkeyAlert } from './components/alert/alert.component';
import { MonkeyIconButton } from './components/icon-button/icon-button.component';
import { MonkeyTooltip } from './components/tooltip/tooltip.component';
import { MonkeyAvatar } from './components/avatar/avatar.component';
import { MonkeyList } from './components/list/list.component';
import { MonkeyDropdown } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    MonkeyThemeChanger,

    MonkeyButton,
    MonkeyCard,
    MonkeySwitch,
    MonkeyCheckbox,
    MonkeyLoader,
    MonkeyImage,
    MonkeyAlert,
    MonkeyIconButton,
    MonkeyTooltip,
    MonkeyAvatar,
    MonkeyList,
    MonkeyDropdown,
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
    MonkeyLoader,
    MonkeyImage,
    MonkeyAlert,
    MonkeyIconButton,
    MonkeyTooltip,
    MonkeyAvatar,
    MonkeyList,
    MonkeyDropdown,
  ],
})
export class NgxMonkeyUiModule { }
