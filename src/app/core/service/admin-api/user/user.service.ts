import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/interface/user';
import { PaginationModel } from 'src/app/core/model/pagination.model';
import { RequestParamModel } from 'src/app/core/model/requestParamModel.model';
import { BaseService } from '../../base/base.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(public baseService: BaseService) { }

  getUserList(
    requestParamModel: RequestParamModel
  ): Observable<PaginationModel<IUser>> {
    return this.baseService.get("user", requestParamModel,true,true).pipe(
      map<HttpResponse<any>, PaginationModel<IUser>>(
        (response: any) => {
          const userList = new PaginationModel<IUser>();
          const headers = response.body.data;
          console.log('hhhh', headers);
          userList.setHeaders(headers);
          userList.data = response.body.data.data as IUser[];
          return userList;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }

  // get single user details.
  getUserAllData(
    userId: number,
    requestParamModel: RequestParamModel
  ): Observable<IUser> {
    return this.baseService.get("user/" + userId, requestParamModel,true,true).pipe(
      map<HttpResponse<any>, IUser>(
        (response) => {
          return response.body.data as IUser;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }

  saveUser(userModel: any): Observable<string> {
    if (userModel._id !== undefined && userModel._id !== null) {
      return this.baseService
        .uploadPut("user/" + userModel._id, userModel, true)
        .pipe(
          map<any, string>(
            (response) => {
              userModel = response.data as IUser;

              return userModel._id;
            },
            (err: any) => {
              return err;
            }
          )
        );
    } else {
      return this.baseService.uploadPost("user", userModel, true, true).pipe(
        map<any, string>(
          (response) => {
            userModel = response.data as IUser;
            return userModel._id;
          },
          (err: any) => {
            return err;
          }
        )
      );
    }
  }
  deleteUser(_id: string) {
    return this.baseService.delete("user/" + _id,true,true).pipe(
      map<any, number>(
        (response) => {
          return response.data;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }
}
