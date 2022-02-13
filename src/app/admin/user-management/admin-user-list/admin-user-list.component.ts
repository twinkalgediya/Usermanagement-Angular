import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColumnListModel } from 'src/app/core/model/columnlist.model';
import { RequestParamModel } from 'src/app/core/model/requestParamModel.model';
import { ResizeEvent } from 'angular-resizable-element';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/core/service/admin-api/user/user.service';
import { PaginationModel } from 'src/app/core/model/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent implements OnInit {
  isLoading: boolean = false;
  rotate = { asc: 'desc', desc: '', '': 'asc' };
  data = new Array();
  column_email = 150;
  column_mobile = 150;
  column_full_name = 100;
  column_status = 100;
  column_actions = 100;
  column_profile_picture = 100;
  columns!: ColumnListModel[];
  requestParamModel!: RequestParamModel;
  constructor(
    public changeDetection: ChangeDetectorRef,
    public userService: UserService,
    public router:Router
  ) {}

  ngOnInit(): void {
    this.configureList(true);
  }
  configureList(resetColsObj: boolean) {
    this.requestParamModel = new RequestParamModel();
    if (resetColsObj) {
      this.columns = [
        {
          name: 'Id',
          property: '_id',
          visible: false,
          datatype: 'string',
          searchable: false,
          searchfield: '_id',
          sortOrder: 'desc',
          isShowinHideList: false,
          column_width: 100,
        },
        {
          name: 'Profile',
          property: 'profile_picture',
          visible: true,
          datatype: 'string',
          searchable: true,
          searchfield: 'profile_picture',
          sortOrder: '',
          isShowinHideList: true,
          column_width: 100,
        },
        {
          name: 'Email',
          property: 'email',
          visible: true,
          searchable: true,
          datatype: 'string',
          searchfield: 'email',
          sortOrder: '',
          isShowinHideList: true,
          column_width: 350,
        },
        {
          name: 'Phone',
          property: 'mobile',
          visible: true,
          searchable: true,
          datatype: 'string',
          searchfield: 'mobile',
          sortOrder: '',
          isShowinHideList: true,
          column_width: 180,
        },
        {
          name: 'User Name',
          property: 'full_name',
          visible: true,
          datatype: 'string',
          searchable: true,
          searchfield: 'full_name',
          sortOrder: '',
          isShowinHideList: true,
          column_width: 248,
        },
        {
          name: 'Status',
          property: 'status',
          visible: true,
          searchable: true,
          datatype: 'number',
          searchfield: 'status',
          sortOrder: '',
          isShowinHideList: true,
          column_width: 159,
        },
        {
          name: 'Action',
          property: 'actions',
          visible: true,
          isShowinHideList: false,
          column_width: 100,
        },
      ] as ColumnListModel[];

      if (this.columns) {
        // this.helperService.removeProprtyFromList(this.columns);
      }
    }

    // this.requestParamModel.addDefaultFilter('user_type', 'normal', 'number');
    this.loadData();
  }

  trackByFn(index: any) {
    return index;
  }

  visibleColumns(name: string) {
    const isShowRow = this.columns.filter(
      (column) => column.visible && column.property == name
    );
    if (isShowRow !== undefined && isShowRow.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  filterReset() {
    this.requestParamModel.resetClear(this.columns);
    this.columns[6].searchValue = undefined;
    this.configureList(false);
  }
  pageSizeChanged(pageSize: any) {
    this.requestParamModel.pageSize = pageSize;
    this.loadData();
  }

  pageIndexChanged(event: any) {
    this.requestParamModel.pageIndex = event.page;
    this.loadData();
  }

  sortColumnChanges(index: any) {
    if (this.columns[0].sortOrder) {
      this.columns[0].sortOrder = null;
    }
    // this.columns[index].sortOrder = this.rotate[this.columns[+index].sortOrder];
    this.requestParamModel.setSorting(this.columns);
    this.loadData();
  }

  onFilterChange() {
    if (
      this.columns &&
      this.columns.length > 0 &&
      this.columns[4].searchValue &&
      this.columns[4].searchValue.length == 0
    ) {
      this.columns[4].searchValue = [];
      this.changeDetection.detectChanges();
    } else {
    }
    this.requestParamModel.setFilters(this.columns);
    this.changeDetection.markForCheck();
    this.loadData();
  }

  clearFilter(index: number) {
    if (index == 3) {
      this.columns[index].searchValue = [];
    } else if (index == 4) {
      this.columns[index].searchValue = [];
    } else {
      delete this.columns[index].searchValue;
    }
  }

  onResizeEnd(event: ResizeEvent, columnName: string) {}

  loadData() {
    console.log('this.requestParamModel.sorts: ', this.requestParamModel.sorts);
    if (!this.requestParamModel.sorts) {
      this.columns[0].sortOrder = 'desc';
      this.requestParamModel.setSorting(this.columns);
    }
    this.changeDetection.markForCheck();
    this.data = [];
    this.isLoading = true;
    this.isLoading = false;
    this.changeDetection.detectChanges();
    this.userService.getUserList(this.requestParamModel).subscribe(
      (dataList: PaginationModel<any>) => {
        this.isLoading = false;
        this.requestParamModel.update<any>(dataList);
        this.data = dataList.data;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }

  onEdit(data:any){
    console.log(data);
    this.router.navigate(['/users/', data._id]);
  };

  onDelete(data:any){
    console.log(data);
    this.userService.deleteUser(data._id).subscribe((data:any)=>{
      this.loadData();
    },(error:HttpErrorResponse)=>{

    });
  }
}
