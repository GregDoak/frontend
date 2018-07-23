import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule, PopoverModule, TimepickerModule} from 'ngx-bootstrap';
import {NgxSelectModule} from 'ngx-select-ex';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../../utilities/table/table.module';
import {MyEventCreateComponent} from './create.component';
import {MyEventListComponent} from './list.component';
import {MyEventUpdateComponent} from './update.component';

const COMPONENTS = [
  MyEventCreateComponent,
  MyEventListComponent,
  MyEventUpdateComponent
];

const routes: Routes = [
  {path: '', component: MyEventListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'create', component: MyEventCreateComponent, pathMatch: 'full', data: {title: 'Create'}},
  {path: 'update/:id', component: MyEventUpdateComponent, pathMatch: 'full', data: {title: 'Update'}}
];

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxSelectModule,
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,
    TimepickerModule.forRoot()
  ],
  declarations: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyEventModule {
}
