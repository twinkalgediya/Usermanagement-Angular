import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListColumn } from '../../model/list-column.model';

@Component({
  selector: 'app-table-sort-column',
  templateUrl: './table-sort-column.component.html',
  styleUrls: ['./table-sort-column.component.scss'],
})
export class TableSortColumnComponent implements OnInit {
  //#region Input/Output Variables
  @Input() index!: number;
  @Input() column: ListColumn = new ListColumn();
  @Output() sortColumnChanges = new EventEmitter();
  //#endregion
  constructor() {}

  ngOnInit(): void {}
  sortColumn(index:number) {
    this.sortColumnChanges.emit(index);
  }
}
