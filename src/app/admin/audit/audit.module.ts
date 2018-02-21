import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../../core/pages/404.component';
import { AdminAuditListComponent } from './list.component';

const COMPONENTS = [
  AdminAuditListComponent
];

const routes: Routes = [
  {path: '', component: AdminAuditListComponent, pathMatch: 'full', data: {title: 'List'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminAuditModule {
}
