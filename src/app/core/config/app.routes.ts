import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { AdminGuard, AuthenticatedGuard } from '../authentication/guards';
import { P404Component } from '../pages/404.component';
import { HomeComponent } from '../../home/home.component';
import { MyComponent } from '../../my/my.component';

export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuard], data: {title: 'Admin'}},
  {path: 'my', component: MyComponent, loadChildren: './my/my.module#MyModule', canActivate: [AuthenticatedGuard], data: {title: 'My'}},
  {path: '', component: HomeComponent, canActivate: [AuthenticatedGuard], data: {title: 'Home'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];
