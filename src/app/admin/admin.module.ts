import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../core/pages/404.component';
import { AdminUserListComponent } from './user/list.component';
import { AdminGroupListComponent } from './group/list.component';
import { AdminRoleListComponent } from './role/list.component';

const COMPONENTS = [
  AdminGroupListComponent,
  AdminRoleListComponent,
  AdminUserListComponent
];

const routes: Routes = [
  {path: 'groups', component: AdminGroupListComponent, pathMatch: 'full', data: {title: 'Groups'}},
  {path: 'roles', component: AdminRoleListComponent, pathMatch: 'full', data: {title: 'Roles'}},
  {path: 'users', component: AdminUserListComponent, pathMatch: 'full', data: {title: 'Users'}},
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
