import {Component, Input} from '@angular/core';
import {TableService} from './table.service';
import {TableHeaderBrandInterface} from './table-header-brand.interface';
import {LinkInterface} from '../../interfaces/core/link.interface';

@Component({
  selector: 'app-table-header',
  templateUrl: 'table-header.component.html',
})
export class TableHeaderComponent {
  @Input() links: LinkInterface[] = [];
  @Input() tableService: TableService = null;
  @Input() tableHeaderBrand: TableHeaderBrandInterface = null;
}
