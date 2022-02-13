export class PaginationModel<T> {
  pageCount!: number;
  pageSize!: number;
  totalCount!: number;
  currentPage!: number;
  data!: T[];
  setHeaders(headers: any): any {
    console.log('header', headers);
    this.totalCount = +headers.total;
    this.pageSize = +headers.limit;
    this.pageCount = +headers.pages;
    this.currentPage = +headers.page;
  }
}
