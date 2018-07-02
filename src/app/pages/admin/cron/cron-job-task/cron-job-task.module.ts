import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../../../utilities/table/table.module';
import {CommonModule} from '@angular/common';
import {NgxSelectModule} from 'ngx-select-ex';
import {AdminCronJobTaskListComponent} from './list.component';
import {AdminCronJobTaskCreateComponent} from './create.component';
import {AdminCronJobTaskUpdateComponent} from './update.component';
import {YesNoPipe} from '../../../../pipes/yes-no.pipe';
import {BsDatepickerModule, TimepickerModule} from 'ngx-bootstrap';
import {P404Component} from '../../../404/404.component';
import {CoreModule} from '../../../../core/core.module';

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
    BsDatepickerModule.forRoot(),
    CommonModule,
    CoreModule,
    FormsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,
    TimepickerModule.forRoot()
  ],
  declarations: [...COMPONENTS, ...PIPES]
})
export class AdminCronJobTaskModule {
}
