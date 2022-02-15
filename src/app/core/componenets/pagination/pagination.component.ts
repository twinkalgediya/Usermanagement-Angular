import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestParamModel } from '../../model/requestParamModel.model';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  //#region Input/Output Parameters
  @Input() requestParamModel!: RequestParamModel;
  @Output() pageChange = new EventEmitter(false);
  @Output() sizeChange = new EventEmitter(false);
  @Input() boundaryLinks = false;
  @Input() disabled = false;
  constructor() { }
  //#region variables declaration
  public maxSize: number = 3;
  public numPages: number = 5;
  public length: number = 50;
  //#endregion

  //#region Functions
  ngOnInit(): void {
  }
  pageIndexChanged($event: any) {
    if ($event)
      this.pageChange.emit($event);
  }

  pageSizeChanged($event: any) {
    this.sizeChange.emit($event);
  }

  //#endregion
}
