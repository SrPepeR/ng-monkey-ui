import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgxMonkeyUiModule } from 'ngx-monkey-ui';
import { RouterModule, Routes } from '@angular/router';

import { ExamplePageComponent } from './example-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplePageComponent,
  },
  {
    path: ':style',
    component: ExamplePageComponent,
  },
];

@NgModule({
  declarations: [
    ExamplePageComponent,
  ],
  imports: [
    CommonModule,
    NgxMonkeyUiModule,
    RouterModule.forChild(routes),
  ]
})
export class ExamplePageModule { }
