import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { map } from 'rxjs/operators';
import { UserModel } from '../../model/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(public baseService: BaseService) { }

  public login(body: any) {
    return this.baseService.post('auth/login', body, false).pipe(
      map<any, any>(
        (response) => {
          if (response.status === 1) {
            localStorage.setItem('token', response.data.token);
          }
          return response;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  public register(body: any) {
    return this.baseService.uploadPost('auth/register', body).pipe(
      map<any, any>(
        (response) => {
          return response;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  // public 

  loginWithFacebook(requestModel: any): Observable<UserModel> {
    return this.baseService.postWithoutToken('auth/facebook', requestModel)
      .pipe(map<any, any>(response => {
        return response.data;
      }, (err: any) => {
        return err;
      }));
  }
  loginWithGoogle(requestModel: any): Observable<UserModel> {
    return this.baseService.postWithoutToken('auth/google', requestModel)
      .pipe(map<any, any>(response => {
        return response.data;
      }, (err: any) => {
        return err;
      }));
  }
}
