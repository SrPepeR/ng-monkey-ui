import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// FIRST LEVEL

import { MonkeyButton } from './components/first-level/button/button.component';
import { MonkeyCard } from './components/first-level/card/card.component';
import { MonkeyImage } from './components/first-level/image/image.component';
import { MonkeySwitch } from './components/first-level/switch/switch.component';
import { MonkeyCheckbox } from './components/first-level/checkbox/checkbox.component';
import { MonkeyLoader } from './components/first-level/loader/loader.component';
import { MonkeyList } from './components/first-level/list/list.component';
import { MonkeyHeader } from './components/first-level/header/header.component';
import { MonkeySubheader } from './components/first-level/subheader/subheader.component';
import { MonkeyIcon } from './components/first-level/icon/icon.component';

// FIRST LEVEL

// SECOND LEVEL

import { MonkeyIconButton } from './components/second-level/icon-button/icon-button.component';
import { MonkeyAvatar } from './components/second-level/avatar/avatar.component';
import { MonkeyDropdown } from './components/second-level/dropdown/dropdown.component';
import { MonkeyButtonsGroup } from './components/second-level/buttons-group/buttons-group.component';

// SECOND LEVEL

// THIRD LEVEL

import { MonkeyAlert } from './components/third-level/alert/alert.component';
import { MonkeyTooltip } from './components/third-level/tooltip/tooltip.component';
import { MonkeyMenu } from './components/third-level/menu/menu.component';
import { MonkeyAsideMenu } from './components/third-level/aside-menu/aside-menu.component';
import { MonkeyContentHeader } from './components/third-level/content-header/content-header.component';

// THIRD LEVEL

// FOURTH LEVEL

import { MonkeyThemeChanger } from './components/fourth-level/theme-changer/theme-changer.component';
import { MonkeyScrollbar } from './components/fourth-level/scrollbar/scrollbar.component';

// FOURTH LEVEL

// FORM

import { MonkeyInputText } from './components/form/input-text/input-text.component';
import { MonkeyInputNumber } from './components/form/input-number/input-number.component';

// FORM


@NgModule({
  declarations: [
    MonkeyThemeChanger,
    MonkeyScrollbar,
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
    MonkeyButtonsGroup,
    MonkeyAsideMenu,
    MonkeyContentHeader,
    MonkeyHeader,
    MonkeySubheader,
    MonkeyIcon,
    MonkeyInputText,
    MonkeyInputNumber,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MonkeyThemeChanger,
    MonkeyScrollbar,
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
    MonkeyButtonsGroup,
    MonkeyAsideMenu,
    MonkeyContentHeader,
    MonkeyHeader,
    MonkeySubheader,
    MonkeyIcon,
    MonkeyInputText,
    MonkeyInputNumber,
  ],
})
export class NgxMonkeyUiModule { }
