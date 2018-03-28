import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../../core/pages/404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../../utility/table/table.module';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { NgxSelectModule } from 'ngx-select-ex';
import { AdminCronJobTaskListComponent } from './list.component';
import { AdminCronJobTaskCreateComponent } from './create.component';
import { AdminCronJobTaskUpdateComponent } from './update.component';
import { YesNoPipe } from '../../../core/pipes/yes-no.pipe';

const COMPONENTS = [
  AdminCronJobTaskListComponent,
  AdminCronJobTaskCreateComponent,
  AdminCronJobTaskUpdateComponent
];

const PIPES = [
  YesNoPipe
];

const routes: Routes = [
  {path: '', component: AdminCronJobTaskListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: AdminCronJobTaskCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: 'update/:id', component: AdminCronJobTaskUpdateComponent, pathMatch: 'full', data: {title: 'Update'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    NgxSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS, ...PIPES]
})
export class AdminCronJobTaskModule {
}
