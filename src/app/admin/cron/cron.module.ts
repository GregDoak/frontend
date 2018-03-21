import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminCronJobListComponent } from './cron-job-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../utility/table/table.module';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { AdminCronJobTaskListComponent } from './cron-job-task-list.component';
import { AdminCronJobTaskCreateComponent } from './cron-job-task-create.component';

const COMPONENTS = [
  AdminCronJobListComponent,
  AdminCronJobTaskListComponent,
  AdminCronJobTaskCreateComponent
];

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {path: 'list', component: AdminCronJobListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'tasks', component: AdminCronJobTaskListComponent, pathMatch: 'full', data: {title: 'Tasks'}},
  {path: 'tasks/create', component: AdminCronJobTaskCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS]
})
export class AdminCronModule {
}
