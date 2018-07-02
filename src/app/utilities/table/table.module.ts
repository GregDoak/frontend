import {TableColumnsComponent} from './table-columns.component';
import {NgModule} from '@angular/core';
import {TableService} from './table.service';
import {CommonModule} from '@angular/common';
import {TablePaginationComponent} from './table-pagination.component';
import {BsDropdownModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {TableHeaderComponent} from './table-header.component';
import {RouterModule} from '@angular/router';

const COMPONENTS = [
  TableColumnsComponent,
  TableHeaderComponent,
  TablePaginationComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    RouterModule
  ],
  providers: [TableService]
})
export class TableModule {
}
