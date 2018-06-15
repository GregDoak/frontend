import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAuditListComponent} from './list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../../utility/table/table.module';
import {CommonModule} from '@angular/common';
import {AdminAuditDetailComponent} from './detail.component';
import {TabsModule} from 'ngx-bootstrap';
import {ObjectLengthPipe} from '../../core/pipes/object-length.pipe';
import {AdminAuditLogComponent} from './audit-log.component';

const COMPONENTS = [
  AdminAuditListComponent,
  AdminAuditDetailComponent,
  AdminAuditLogComponent
];

const PIPES = [
  ObjectLengthPipe
];

const routes: Routes = [
  {path: '', component: AdminAuditListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: 'view/:id', component: AdminAuditDetailComponent, pathMatch: 'full', data: {title: 'View'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,
    TabsModule.forRoot()
  ],
  declarations: [...COMPONENTS, ...PIPES]
})
export class AdminAuditModule {
}
