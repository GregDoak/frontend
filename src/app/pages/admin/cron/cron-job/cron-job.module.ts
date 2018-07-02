import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminCronJobListComponent} from './list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../../../utilities/table/table.module';
import {CommonModule} from '@angular/common';
import {NgxSelectModule} from 'ngx-select-ex';
import {AdminCronJobLogComponent} from './log.component';
import {P404Component} from '../../../404/404.component';
import {CoreModule} from '../../../../core/core.module';

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
    CoreModule,
    CommonModule,
    FormsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS]
})
export class AdminCronJobModule {
}
