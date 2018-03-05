import { Injectable } from '@angular/core';
import { TableColumnInterface } from './table-column.interface';
import { tableConfig } from './table.config';


@Injectable()
export class TableService {
  public config = tableConfig;
  public rows: any[] = [];

  private columns: TableColumnInterface[] = [];
  private data: any[] = [];

  public doExport() {
    let rows: string[] = this.rows;
    if (rows.length === 0) {
      return false;
    }
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(rows[0]);
    let data: string[] = rows.map(
      (row) => header.map(
        (fieldName) => JSON.stringify(row[fieldName], replacer)
      ).join(','));
    data.unshift(header.join(','));
    let csv: string = data.join('\r\n');

    let blob = new Blob([csv], {type: 'text/csv'});
    let downloadUrl = window.URL.createObjectURL(blob);
    window.open(downloadUrl);
  }

  public onChangeTable(): any {
    let filteredData = this.onChangeFilter();
    let sortedData = this.onChangeSort(filteredData);
    this.rows = this.onChangePage(sortedData);
  }

  public onSortColumn(column) {
    if (column.name) {
      let sortOrder = 'asc';
      if (this.config.sorting.column.name === column.name) {
        switch (this.config.sorting.column.order) {
          case 'asc':
            sortOrder = 'desc';
            break;
          case 'desc':
            sortOrder = null;
            break;
          default:
            sortOrder = 'asc';
            break;
        }
      }

      this.config.sorting.column = {
        name: column.name,
        order: sortOrder
      };

      this.onChangeTable();
    }
  }

  public setTableData(data: any[]) {
    this.data = data;
    this.onChangeTable();
  }

  private onChangeFilter(): any {
    let filteredData: any[] = this.data;

    if (!this.config.filtering) {
      return filteredData;
    }

    if (this.config.filtering.search === '') {
      return filteredData;
    }

    let tempArray: any[] = [];
    filteredData.forEach((item: any) => {
      let match = false;
      let columns = Object.keys(item);
      columns.forEach((column: any) => {
        if (
          item[column] !== null &&
          item[column].toString().toLowerCase().match(this.config.filtering.search.toLowerCase())
        ) {
          match = true;
        }
      });
      if (match) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  private onChangeSort(filteredData) {
    if (!this.config.sorting) {
      return filteredData;
    }

    if (this.config.sorting.column.name === null || this.config.sorting.column.order === null) {
      return filteredData;
    }

    return filteredData.sort((previous: any, current: any) => {
      if (
        previous[this.config.sorting.column.name] > current[this.config.sorting.column.name]
      ) {
        return this.config.sorting.column.order === 'desc' ? -1 : 1;
      } else if (
        previous[this.config.sorting.column.name] < current[this.config.sorting.column.name]
      ) {
        return this.config.sorting.column.order === 'asc' ? -1 : 1;
      }
      return 0;
    });

  }

  private onChangePage(sortedData: any[]) {
    if (!this.config.pagination) {
      return sortedData;
    }
    this.config.pagination.collectionSize = this.data.length;
    this.config.pagination.collectionSize = sortedData.length;
    let start = (this.config.pagination.page - 1) * this.config.pagination.pageSize;
    let end = this.config.pagination.pageSize > -1 ?
      (start + this.config.pagination.pageSize) : sortedData.length;
    return sortedData.slice(start, end);
  }
}
