import { Injectable } from '@angular/core';
import { TableColumnInterface } from './table-column.interface';
import { tableConfig } from './table.config';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable()
export class TableService {
  public config;
  public defaultConfig;

  private columns: TableColumnInterface[] = [];
  private data: any[] = [];
  private rows: any[] = [];

  public constructor() {
    this.defaultConfig = tableConfig;
    this.setConfig();
  }

  public doExport(type = 'csv') {
    let rows: any[] = this.rows;
    if (!this.config.exporting.enabled || rows.length === 0) {
      return false;
    }

    let headers: TableColumnInterface[] = this.columns.map((column: TableColumnInterface) => {
      return column.name !== null && column.visible !== false ? column : null;
    }).filter(column => column);

    let data: any[] = rows.map(
      (row) => headers.map(
        (field) => {
          let value = row[field.name];
          return value === null || value === undefined ? '' : value;
        }
      )
    );

    switch (type.toLowerCase()) {
      case 'csv':
        this.exportCsv(headers, data);
        break;
      case 'pdf':
        this.exportPdf(headers, data);
        break;
      default:
        return false;
    }
  }

  /**
   * @returns {any[]}
   */
  public getColumns(): any[] {
    return this.columns;
  }

  /**
   * @returns {any[]}
   */
  public getData(): any[] {
    return this.data;
  }

  /**
   * @returns {any[]}
   */
  public getRows(): any[] {
    return this.rows;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */
  public isColumnVisible(index: number): boolean {
    return this.columns[index].visible !== false;
  }

  public onChangeTable(): void {
    let filteredData = this.onChangeFilter();
    let sortedData = this.onChangeSort(filteredData);
    this.rows = this.onChangePage(sortedData);
  }

  /**
   * @param {TableColumnInterface} column
   * @param {string} sortOrder
   */
  public onSortColumn(column: TableColumnInterface, sortOrder = 'asc') {
    sortOrder = sortOrder.toLowerCase();
    if (column.name) {
      if (this.config.sorting.column.name === column.name) {
        switch (this.config.sorting.column.order) {
          case 'asc':
            sortOrder = 'desc';
            break;
          case 'desc':
            sortOrder = 'asc';
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

  /**
   * @param {number} index
   */
  public onToggleColumn(index: number): void {
    this.columns[index].visible = !this.isColumnVisible(index);
  }

  /**
   * @param {TableColumnInterface[]} columns
   */
  public setColumns(columns: TableColumnInterface[]) {
    this.columns = columns;
  }

  public setConfig() {
    this.config = JSON.parse(JSON.stringify(this.defaultConfig));
  }

  /**
   * @param {any[]} data
   */
  public setData(data: any[]) {
    this.data = data;
    this.onChangeTable();
  }

  /**
   * @param event
   */
  public setPageNumber(event: any) {
    this.config.pagination.page = event.page;
    this.onChangeTable();
  }

  /**
   * @param {TableColumnInterface[]} columns
   * @param {any[]} rows
   */
  private exportCsv(columns: TableColumnInterface[], rows: any[]): void {
    let data = [columns.map((column: TableColumnInterface) => column.title)].concat(rows);
    let csv: string = data.map((row) => row.map((column) => JSON.stringify(column))).join('\r\n');

    let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, this.config.exporting.filename + '.csv');
    } else {
      let link = document.createElement('a');
      if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.config.exporting.filename + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  /**
   * @param {TableColumnInterface[]} columns
   * @param {any[]} rows
   */
  private exportPdf(columns: TableColumnInterface[], rows: any[]): void {
    let header = columns.map((column: TableColumnInterface) => column.title);

    let pdf = new jsPDF();
    pdf.autoTable(header, rows);
    pdf.save(this.config.exporting.filename + '.pdf');
  }

  /**
   * @returns {any}
   */
  private onChangeFilter(): any {
    let filteredData: any[] = this.data;

    if (!this.config.filtering.enabled) {
      return filteredData;
    }

    if (this.config.filtering.searchTerm === '') {
      return filteredData;
    }

    let tempArray: any[] = [];
    filteredData.forEach((item: any) => {
      let match = false;
      let columns = Object.keys(item);
      columns.forEach((column: any) => {
        if (
          item[column] !== null &&
          item[column].toString().toLowerCase().match(this.config.filtering.searchTerm.toLowerCase())
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

  /**
   * @param {any[]} filteredData
   * @returns {any[]}
   */
  private onChangeSort(filteredData: any[]) {
    if (!this.config.sorting.enabled) {
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

  /**
   * @param {any[]} sortedData
   * @returns {any[]}
   */
  private onChangePage(sortedData: any[]) {
    if (!this.config.pagination.enabled) {
      return sortedData;
    }
    this.config.pagination.collectionSize = sortedData.length;
    let start = (this.config.pagination.page - 1) * this.config.pagination.itemsPerPage;
    let end = this.config.pagination.itemsPerPage > -1 ?
      (start + this.config.pagination.itemsPerPage) : sortedData.length;
    if (end > sortedData.length) {
      end = sortedData.length;
    }
    this.config.pagination.start = start;
    this.config.pagination.end = end;
    return sortedData.slice(start, end);
  }
}
