import { Component, Input } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table-columns',
  templateUrl: 'table-columns.component.html',
})
export class TableColumnsComponent {
  @Input() tableService: TableService
}
