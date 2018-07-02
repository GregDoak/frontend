import {Routes} from '@angular/router';
import {AdminGuard, AuthenticatedGuard} from '../authentication/guards';

import {AuthenticatedMainComponent} from '../../containers/main/authenticated-main.component';
import {DefaultMainComponent} from '../../containers/main/default-main.component';
import {HomeComponent} from '../../pages/home/home.component';
import {LoginComponent} from '../../pages/login/login.component';
import {MyComponent} from '../../pages/my/my.component';
import {P404Component} from '../../pages/404/404.component';

export const ROUTES: Routes = [
  {
    path: 'login', component: DefaultMainComponent, children: [
      {path: '', component: LoginComponent, data: {title: 'Login'}}
    ]
  },
  {
    path: '', component: AuthenticatedMainComponent, data: {title: 'Home'}, children: [
      {path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [AdminGuard], data: {title: 'Admin'}},
      {
        path: 'my',
        component: MyComponent,
        loadChildren: './pages/my/my.module#MyModule',
        canActivate: [AuthenticatedGuard],
        data: {title: 'My'}
      },
      {path: '', component: HomeComponent, canActivate: [AuthenticatedGuard], data: {title: 'Home'}},
    ]
  },
  {
    path: '**', component: DefaultMainComponent, children: [
      {path: '', component: P404Component, data: {title: '404'}}
    ]
  },
];
