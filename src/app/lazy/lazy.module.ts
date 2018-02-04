import { NgModule } from '@angular/core';

import { LazyComponent } from './lazy.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'lazy', pathMatch: 'full'},
  {path: 'lazy', component: LazyComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [LazyComponent]
})
export class LazyModule {
}
