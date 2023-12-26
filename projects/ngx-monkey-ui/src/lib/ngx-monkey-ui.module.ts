import { NgModule } from '@angular/core';
import { NgxMonkeyUiComponent } from './ngx-monkey-ui.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    NgxMonkeyUiComponent,
    ButtonComponent
  ],
  imports: [
  ],
  exports: [
    NgxMonkeyUiComponent
  ]
})
export class NgxMonkeyUiModule { }
