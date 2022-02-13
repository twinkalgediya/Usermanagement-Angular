import { ColumnListModel } from "./columnlist.model";
import { ListColumn } from "./list-column.model";
import { PaginationModel } from "./pagination.model";

// // import { Sort, PageEvent } from '@angular/m
export class RequestParamModel {
  pageIndex = 0;
  pageSize?: any;
  sort?: string;
  pagination?: string;
  asc = true;
  fields?: string[];
  assignedto?: string[];
  expands?: string[];
  totalCount?: number;
  filter?: string;
  defaultFilter = '';
  setOrArrayFilter = '';
  timer: any;
  contestId?: string;
  match_Id?: number;
  sorts?: string;
  pageCount?: any;
  group?: any;
  constructor() {
    this.pageIndex = 0;
    this.pageSize = 10;
  }

  update<T>(pagedList: PaginationModel<T>) {
    this.pageSize = pagedList.pageSize;
    this.totalCount = pagedList.totalCount;
    this.pageIndex = pagedList.currentPage;
  }

  setFilters(columns: ColumnListModel[]): any {
    this.filter = '';
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].searchable && columns[i].searchValue) {
        const field = columns[i].searchfield;
        const searcvalue = encodeURI(columns[i].searchValue);
        if (columns[i].datatype === 'date') {
          if (columns[i].dateFiltertype) {
            this.filter +=
              '&filter[' +
              field +
              '][' +
              columns[i].dateFiltertype +
              ']=' +
              columns[i].searchValue;
          } 
        } else if (columns[i].datatype !== 'number') {
          this.filter += '&filter[' + field + ']' + '=' + searcvalue;
        } else {
          this.filter += '&filter[' + field + ']' + '=' + searcvalue;
        }
      }
    }
  }

  addDateDefaultFilter(field: string, value: any, datatype: string) {
    if (field && value) {
      if (datatype !== 'gte') {
        this.defaultFilter += '&filter[' + field + ']' + '[$gte]' + '=' + value;
      } else {
        this.defaultFilter += '&filter[' + field + ']' + '[$lte]' + '=' + value;
      }
    }
  }

  addDefaultFilter(field: string, value: any, datatype: string) {
    if (field && value) {
      if (datatype !== 'number') {
        this.defaultFilter += '&filter[' + field + ']' + '[like]' + '=' + value;
      } else {
        this.defaultFilter += '&filter[' + field + ']' + '=' + value;
      }
    }
  }
  filterAndWithArray(arr:any, field:string[]) {
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== '') {
          this.setOrArrayFilter +=
            '&assignedto[' +
            field +
            '][' +
            i +
            ']' +
            '=' +
            encodeURIComponent(arr[i]);
        }
      }
    }
  }
  setDefaultFiltersDropdown(field: string, value: any, datatype: string) {
    if (field && value) {
      if (datatype !== 'number') {
        this.defaultFilter +=
          '&filter[dropdown][' +
          field +
          ']' +
          '[like]' +
          '=' +
          encodeURIComponent(value);
      } else {
        this.defaultFilter +=
          '&filter[dropdown][' + field + ']' + '=' + encodeURIComponent(value);
        // this.defaultFilter += '&filter[dropdown][' + field + ']' + '=' + value;
      }
    }
  }

  addAssignedtoFilter(field: string, value: any) {
    if (field && value) {
      this.defaultFilter +=
        '&assignedto[' + field + ']' + '=' + encodeURIComponent(value);
    } else if (field) {
      this.defaultFilter += '&assignedto[' + field + ']' + '=' + null;
    }
  }

  resetClear(columns: ColumnListModel[]) {
    this.filter = '';
    for (let i = 0; i < columns.length; i++) {
      columns[i].searchValue = '';
    }
  }

  setSorting(columns: ListColumn[]): any {
    this.sorts = '';
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sortOrder && columns[i].sortOrder != '') {
        //this.sorts += (this.sorts != '' ? ',' : '') + (columns[i].sortOrder === 'desc' ? '-' : '') + columns[i].property
        this.sorts +=
          '&sort[' +
          columns[i].property +
          ']' +
          '=' +
          (columns[i].sortOrder === 'desc' ? '-1' : '1');
      }
    }
  }

  // // sortChange(event: Sort): any {
  // //     if (event.direction) {
  // //         this.sort = event.active;
  // //         this.asc = event.direction === 'asc';
  // //     } else {
  // //         this.sort = '';
  // //         this.asc = true;
  // //     }
  // // }

  // // pageChanged(event: PageEvent): any {
  // //     this.pageIndex = event.pageIndex;
  // //     this.pageSize = event.pageSize;
  // // }

  getParams(): string {
    // TODO : Optimize to use the URLQueryParams
    let param = '';

    if (this.defaultFilter) {
      param += this.defaultFilter;
    }

    if (this.filter) {
      param += this.filter;
    }
   

    if (this.sorts) {
      param += this.sorts;
      //'&sort=' + (!this.asc ? '-' : '') + this.sorts;
    }

    if (this.pageIndex) {
      param += '&page=' + this.pageIndex;
    }
    if (this.pageSize) {
      param += '&limit=' + this.pageSize;
    }
    if (this.group) {
      param += '&group=true';
    }
    if (param) {
      param = param.replace('&', '?');
    }
    if (this.setOrArrayFilter) {
      param += this.setOrArrayFilter;
    }
    return param;
  }
  private getListParam(paramName: string, paramValue: string[]): string {
    let param = '';
    if (paramValue) {
      param = paramName + '=' + paramValue.join(',');
    }
    return param;
  }
}
