import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EagerComponent } from './eager.component';

import { ROUTES } from './app.routes';
import { AsideToggleDirective } from './core/directives/aside.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './core/directives/nav-dropdown.directive';
import { ReplaceDirective } from './core/directives/replace.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './core/directives/sidebar.directive';

import 'jquery';
import 'bootstrap';
import 'styles/styles.scss'
import 'app/core/config/fort-awesome.config';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

@NgModule({
  declarations: [
    AppComponent,
    EagerComponent,
    ...APP_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
