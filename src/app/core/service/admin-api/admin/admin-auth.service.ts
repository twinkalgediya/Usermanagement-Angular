import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { map} from 'rxjs/operators';
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
          localStorage.setItem('admintoken', data.data.token);
        }
        return data;
      },
      (error: any) => {
        return error;
      }
    );
  }

  public register(body: any) {
    return this.baseService.post('adminauth/register', body, false).pipe(map<any, any>(
      (response: any) => {
        return response;
      },
      (error: any) => {
        return error;
      }
    )
    );
  }
}
