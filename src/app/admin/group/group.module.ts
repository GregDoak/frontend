import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGroupCreateComponent } from './create.component';
import { AdminGroupDeleteComponent } from './delete.component';
import { AdminGroupListComponent } from './list.component';
import { AdminGroupUpdateComponent } from './update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../utility/table/table.module';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { PopoverModule } from 'ngx-bootstrap';

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
  {path: 'update/:id', component: AdminGroupUpdateComponent, pathMatch: 'full', data: {title: 'Update'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSelectModule,
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS]
})
export class AdminGroupModule {
}
