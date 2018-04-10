import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../core/pages/404.component';
import { MyPasswordComponent } from './password/password.component';
import { MyProfileComponent } from './profile/profile.component';
import { MyTokenComponent } from './token/token.component';
import { MyComponent } from './my.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  MyComponent,
  MyPasswordComponent,
  MyProfileComponent,
  MyTokenComponent
];

const routes: Routes = [
  {path: '', component: MyProfileComponent, data: {title: 'Profile'}},
  {path: 'password', component: MyPasswordComponent, data: {title: 'Password'}},
  {path: 'profile', component: MyProfileComponent, data: {title: 'Profile'}},
  {path: 'tokens', component: MyTokenComponent, data: {title: 'Token'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS]
})
export class MyModule {
}
