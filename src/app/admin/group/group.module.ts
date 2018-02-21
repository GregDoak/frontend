import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminGroupCreateComponent } from './create.component';
import { AdminGroupDeleteComponent } from './delete.component';
import { AdminGroupListComponent } from './list.component';
import { AdminGroupUpdateComponent } from './update.component';

const COMPONENTS = [
  AdminGroupCreateComponent,
  AdminGroupDeleteComponent,
  AdminGroupListComponent,
  AdminGroupUpdateComponent
];

const routes: Routes = [
  {path: '', component: AdminGroupListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: AdminGroupCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: 'delete/:id', component: AdminGroupDeleteComponent, pathMatch: 'full', data: {title: 'Delete'}},
  {path: 'update/:id', component: AdminGroupUpdateComponent, pathMatch: 'full', data: {title: 'Update'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminGroupModule {
}
