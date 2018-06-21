import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../../utility/table/table.module';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import {NgxSelectModule} from 'ngx-select-ex';
import {AdminCronJobTaskListComponent} from './list.component';
import {AdminCronJobTaskCreateComponent} from './create.component';
import {AdminCronJobTaskUpdateComponent} from './update.component';
import {YesNoPipe} from '../../../core/pipes/yes-no.pipe';
import {BsDatepickerModule, TimepickerModule} from 'ngx-bootstrap';

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
  {path: 'update/:id', component: AdminCronJobTaskUpdateComponent, pathMatch: 'full', data: {title: 'Update'}}
];

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    MomentModule,
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
