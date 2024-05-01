import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxMonkeyUiModule } from 'ngx-monkey-ui';

import { ComponentsPortfolioComponent } from './components-portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ComponentsPortfolioComponent,
  },
  {
    path: ':style',
    component: ComponentsPortfolioComponent,
  },
];

@NgModule({
  declarations: [
    ComponentsPortfolioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    NgxMonkeyUiModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [ComponentsPortfolioComponent]
})
export class ComponentsPortfolioModule { }
