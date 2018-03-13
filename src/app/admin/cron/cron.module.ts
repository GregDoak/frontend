import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminCronJobListComponent } from './cron-job-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../utility/table/table.module';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';

const COMPONENTS = [
  AdminCronJobListComponent
];

const routes: Routes = [
  {path: '', component: AdminCronJobListComponent, pathMatch: 'full', data: {title: 'List'}},
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
