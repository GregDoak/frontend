import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItemComponent} from '../utilities/menu-item/menu-item.component';
import {RouterModule} from '@angular/router';
import {P404Component} from '../pages/404/404.component';
import {MomentModule} from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MenuItemComponent,
    MomentModule,
    P404Component
  ],
  declarations: [
    MenuItemComponent,
    P404Component
  ]
})
export class CoreModule {
}
