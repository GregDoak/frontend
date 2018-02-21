import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserListComponent } from './list.component';
import { P404Component } from '../../core/pages/404.component';
import { AdminUserCreateComponent } from './create.component';
import { AdminUserDeleteComponent } from './delete.component';
import { AdminUserUpdateComponent } from './update.component';

const COMPONENTS = [
  AdminUserCreateComponent,
  AdminUserDeleteComponent,
  AdminUserListComponent,
  AdminUserUpdateComponent
];

const routes: Routes = [
  {path: '', component: AdminUserListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: AdminUserCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: 'delete/:id', component: AdminUserDeleteComponent, pathMatch: 'full', data: {title: 'Delete'}},
  {path: 'update/:id', component: AdminUserUpdateComponent, pathMatch: 'full', data: {title: 'Update'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminUserModule {
}
