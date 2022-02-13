import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    public baseService: BaseService
  
  ) { }
  
  login(body: any) {
  return this.baseService.post('adminauth/login', body, false).subscribe(
    (data: any) => {
      if (data.status === 200) {
        localStorage.setItem('token', data.data.token);
      }
      return data;
    },
    (error: any) => {
      return error;
    }
  ); 
  }

  register(body: any) {
   return this.baseService.post('adminauth/register', body, false).subscribe(
     (data: any) => {
       return data;
     },
     (error: any) => {
       return error;
     }
   );
  }
}
