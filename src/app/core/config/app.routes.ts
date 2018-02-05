import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { EagerComponent } from '../../eager.component';
import { AuthenticatedGuard } from '../authentication/guards';

export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'eager', component: EagerComponent, canActivate: [AuthenticatedGuard]},
  {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule', canActivate: [AuthenticatedGuard]},
  {path: '', redirectTo: 'eager', pathMatch: 'full'}
];
