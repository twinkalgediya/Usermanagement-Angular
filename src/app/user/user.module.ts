import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CoreModule } from '../core/core.module';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [UserLoginComponent, UserRegistrationComponent, WelcomeComponent],
  imports: [CommonModule, UserRoutingModule, CoreModule],
})
export class UserModule {}
