import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }
  private profileModel: UserModel = new UserModel();
  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
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
}
