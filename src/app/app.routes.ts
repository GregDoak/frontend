import { Routes } from '@angular/router';
import { EagerComponent } from './eager.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'eager', pathMatch: 'full'},
  {path: 'eager', component: EagerComponent},
  {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'}
];
