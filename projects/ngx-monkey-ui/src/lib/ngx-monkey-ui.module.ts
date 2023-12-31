import { NgModule } from '@angular/core';
import { MonkeyButton } from './components/default/button/button.component';
import { MonkeyCard } from './components/default/card/card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MonkeyButton,
    MonkeyCard
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MonkeyButton,
    MonkeyCard
  ]
})
export class NgxMonkeyUiModule { }
