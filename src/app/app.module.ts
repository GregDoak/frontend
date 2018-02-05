import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import './core/config/app.imports';

import { ROUTES } from './core/config/app.routes';
import { APP_COMPONENTS } from './core/config/app.components';
import { APP_DIRECTIVES } from './core/config/app.directives';
import { APP_MODULES } from './core/config/app.modules';
import { APP_PROVIDERS } from './core/config/app.providers';

import { RouterModule } from '@angular/router';
import { EagerComponent } from './eager.component';

@NgModule({
  declarations: [
    AppComponent,
    EagerComponent,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ...APP_MODULES
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
