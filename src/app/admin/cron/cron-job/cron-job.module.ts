import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../../core/pages/404.component';
import { AdminCronJobListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../../utility/table/table.module';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { NgxSelectModule } from 'ngx-select-ex';
import { AdminCronJobLogComponent } from './log.component';

const COMPONENTS = [
  AdminCronJobListComponent,
  AdminCronJobLogComponent
];

const routes: Routes = [
  {path: '', component: AdminCronJobListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'log/:id', component: AdminCronJobLogComponent, pathMatch: 'full', data: {title: 'Log'}},
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
  declarations: [...COMPONENTS]
})
export class AdminCronJobModule {
}
