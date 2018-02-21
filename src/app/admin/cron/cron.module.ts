import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminCronListComponent } from './list.component';

const COMPONENTS = [
  AdminCronListComponent
];

const routes: Routes = [
  {path: '', component: AdminCronListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminCronModule {
}
