import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyPasswordComponent} from './password/password.component';
import {MyProfileComponent} from './profile/profile.component';
import {MyTokenComponent} from './token/token.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../utility/table/table.module';
import {OperatingSystemPipe} from '../core/pipes/operating-system-pipe';
import {BrowserPipe} from '../core/pipes/browser-pipe';
import {ModalModule} from 'ngx-bootstrap';

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
  {path: 'tokens', component: MyTokenComponent, data: {title: 'Token'}}
];

@NgModule({
  imports: [
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
