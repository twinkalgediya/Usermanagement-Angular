import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }
  private profileModel: UserModel = new UserModel();
  private adminProfileModel: UserModel = new UserModel();
  _profileModel = new BehaviorSubject<UserModel>(new UserModel());
  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') : localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token != null && token != undefined;
  }
  public getUserProfile(): any {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.profileModel = JSON.parse(userData) as UserModel;
      return this.profileModel;
    } else {
      return null
    }
  }
  public getAdminProfile(): any {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      this.adminProfileModel = JSON.parse(userData) as UserModel;
      return this.adminProfileModel;
    } else {
      return null
    }
  }
  clearToken(): void {
    localStorage.removeItem('token');
  }
  setAdminDetail(detail: any) {
    let model = { id: detail.id, name: detail.name, email: detail.email, role: detail.role };
    localStorage.setItem("admin_user", JSON.stringify(model));
  }
}
