import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../core/pages/404.component';
import { AdminGroupListComponent } from './group/list.component';
import { AdminRoleListComponent } from './role/list.component';
import { AdminAuditListComponent } from './audit/list.component';
import { AdminCronListComponent } from './cron/list.component';
import { AdminGuard } from '../core/authentication/guards';

const COMPONENTS = [
  AdminAuditListComponent,
  AdminCronListComponent,
  AdminGroupListComponent,
  AdminRoleListComponent
];

const routes: Routes = [
  {path: 'audit-logs', component: AdminAuditListComponent, pathMatch: 'full', data: {title: 'Audit Logs'}},
  {path: 'cron-jobs', component: AdminCronListComponent, pathMatch: 'full', data: {title: 'Cron Jobs'}},
  {path: 'groups', component: AdminGroupListComponent, pathMatch: 'full', data: {title: 'Groups'}},
  {path: 'roles', component: AdminRoleListComponent, pathMatch: 'full', data: {title: 'Roles'}},
  {path: 'users', loadChildren: './user/user.module#UserModule', canActivate: [AdminGuard], data: {title: 'Users'}},
  {path: '**', component: P404Component, data: {title: '404'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS]
})
export class AdminModule {
}
