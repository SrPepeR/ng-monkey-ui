import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// FIRST LEVEL

import { MonkeyButton } from './components/first-level/button/button.component';
import { MonkeyCard } from './components/first-level/card/card.component';
import { MonkeyImage } from './components/first-level/image/image.component';
import { MonkeySwitch } from './components/first-level/switch/switch.component';
import { MonkeyCheckbox } from './components/first-level/checkbox/checkbox.component';
import { MonkeyLoader } from './components/first-level/loader/loader.component';
import { MonkeyList } from './components/first-level/list/list.component';

// FIRST LEVEL

// SECOND LEVEL

import { MonkeyIconButton } from './components/second-level/icon-button/icon-button.component';
import { MonkeyAvatar } from './components/second-level/avatar/avatar.component';
import { MonkeyDropdown } from './components/second-level/dropdown/dropdown.component';

// SECOND LEVEL

// THIRD LEVEL

import { MonkeyAlert } from './components/third-level/alert/alert.component';
import { MonkeyTooltip } from './components/third-level/tooltip/tooltip.component';
import { MonkeyMenu } from './components/third-level/menu/menu.component';

// THIRD LEVEL

// FOURTH LEVEL

import { MonkeyThemeChanger } from './components/fourth-level/theme-changer/theme-changer.component';

// FOURTH LEVEL


@NgModule({
  declarations: [
    MonkeyThemeChanger,
    MonkeyMenu,

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
    MonkeyMenu,

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
