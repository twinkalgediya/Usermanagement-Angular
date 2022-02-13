import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from '../../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    public baseService: BaseService
  
  ) { }
  
  login(body: any) {
  return this.baseService.post('adminauth/login', body, false).pipe(
    map<any,any>((data: any) => {
      if (data.status === 1) {
        localStorage.setItem('token', data.data.token);
      }
      return data;
    },
    (error: any) => {
      return error;
    })
  ); 
  }

  register(body: any) {
   return this.baseService.post('adminauth/register', body, false).pipe(
     map<any,any>((data: any) => {
       return data;
     },
     (error: any) => {
       return error;
     })
   );
  }
}
