import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../core/pages/404.component';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../core/authentication/guards';

const COMPONENTS = [
  AdminComponent
];

const routes: Routes = [
  {path: '', component: AdminComponent, pathMatch: 'full', canActivate: [AdminGuard], data: {title: 'Menu'}},
  {path: 'audit-logs', loadChildren: './audit/audit.module#AdminAuditModule', canActivate: [AdminGuard], data: {title: 'Audit Logs'}},
  {path: 'cron-jobs', loadChildren: './cron/cron.module#AdminCronModule', canActivate: [AdminGuard], data: {title: 'Cron Jobs'}},
  {path: 'groups', loadChildren: './group/group.module#AdminGroupModule', canActivate: [AdminGuard], data: {title: 'Group'}},
  {path: 'roles', loadChildren: './role/role.module#AdminRoleModule', canActivate: [AdminGuard], data: {title: 'Roles'}},
  {path: 'users', loadChildren: './user/user.module#AdminUserModule', canActivate: [AdminGuard], data: {title: 'Users'}},
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
