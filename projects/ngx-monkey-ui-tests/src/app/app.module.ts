import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxMonkeyUiModule } from 'ngx-monkey-ui';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { ComponentsPortfolioComponent } from './pages/components-portfolio/components-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,

    // Pages
    ExamplePageComponent,
    ComponentsPortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMonkeyUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
