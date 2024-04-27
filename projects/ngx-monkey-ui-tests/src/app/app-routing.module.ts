import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./pages/components-portfolio/components-portfolio.module').then(m => m.ComponentsPortfolioModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/example-page/example-page.module').then(m => m.ExamplePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
