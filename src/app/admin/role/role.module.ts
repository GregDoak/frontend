import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminRoleCreateComponent } from './create.component';
import { AdminRoleDeleteComponent } from './delete.component';
import { AdminRoleListComponent } from './list.component';
import { AdminRoleUpdateComponent } from './update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from '../../utility/table/table.module';

const COMPONENTS = [
  AdminRoleCreateComponent,
  AdminRoleDeleteComponent,
  AdminRoleListComponent,
  AdminRoleUpdateComponent
];

const routes: Routes = [
  {path: '', component: AdminRoleListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: AdminRoleCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: 'delete/:id', component: AdminRoleDeleteComponent, pathMatch: 'full', data: {title: 'Delete'}},
  {path: 'update/:id', component: AdminRoleUpdateComponent, pathMatch: 'full', data: {title: 'Update'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS]
})
export class AdminRoleModule {
}
