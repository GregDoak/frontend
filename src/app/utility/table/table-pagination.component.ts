import { Component, Input } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: 'table-pagination.component.html',
})
export class TablePaginationComponent {
  @Input() tableService: TableService
}
