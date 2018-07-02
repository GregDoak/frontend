import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyPasswordComponent} from './password/password.component';
import {MyProfileComponent} from './profile/profile.component';
import {MyTokenComponent} from './token/token.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../utilities/table/table.module';
import {OperatingSystemPipe} from '../../pipes/operating-system-pipe';
import {BrowserPipe} from '../../pipes/browser-pipe';
import {ModalModule} from 'ngx-bootstrap';
import {P404Component} from '../404/404.component';
import {CoreModule} from '../../core/core.module';

const COMPONENTS = [
  MyPasswordComponent,
  MyProfileComponent,
  MyTokenComponent
];

const PIPES = [
  OperatingSystemPipe,
  BrowserPipe
];

const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'password', component: MyPasswordComponent, data: {title: 'Password'}},
  {path: 'profile', component: MyProfileComponent, data: {title: 'Profile'}},
  {path: 'tokens', component: MyTokenComponent, data: {title: 'Token'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TableModule
  ],
  declarations: [...COMPONENTS, ...PIPES]
})
export class MyModule {
}
