import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {enGbLocale} from 'ngx-bootstrap/locale';

// The string MUST be lower case - even though the examples give it as enGb
defineLocale('engb', enGbLocale);

import './core/config/app.imports';

import {AppComponent} from './app.component';
import {ROUTES} from './core/config/app.routes';
import {APP_COMPONENTS} from './core/config/app.components';
import {APP_DIRECTIVES} from './core/config/app.directives';
import {APP_MODULES} from './core/config/app.modules';
import {APP_PROVIDERS} from './core/config/app.providers';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ...APP_MODULES
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ...APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
