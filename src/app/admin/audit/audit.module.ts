import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminAuditListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../utility/table/table.module';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  AdminAuditListComponent
];

const routes: Routes = [
  {path: '', component: AdminAuditListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [...COMPONENTS]
})
export class AdminAuditModule {
}
