import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserListComponent } from './list.component';
import { P404Component } from '../../core/pages/404.component';
import { AdminUserCreateComponent } from './create.component';

const COMPONENTS = [
  AdminUserCreateComponent,
  AdminUserListComponent
];

const routes: Routes = [
  {path: '', component: AdminUserListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: AdminUserCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminModule {
}
