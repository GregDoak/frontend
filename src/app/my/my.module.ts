import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../core/pages/404.component';
import { MyPasswordComponent } from './password/password.component';
import { MyProfileComponent } from './profile/profile.component';
import { MyTokenComponent } from './token/token.component';

const COMPONENTS = [
  MyPasswordComponent,
  MyProfileComponent,
  MyTokenComponent
];

const routes: Routes = [
  {path: 'password', component: MyPasswordComponent, pathMatch: 'full', data: {title: 'Password'}},
  {path: 'profile', component: MyProfileComponent, pathMatch: 'full', data: {title: 'Profile'}},
  {path: 'token', component: MyTokenComponent, pathMatch: 'full', data: {title: 'Token'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class MyModule {
}
