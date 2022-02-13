import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [AdminLoginComponent, AdminRegisterComponent],
  imports: [CommonModule, AdminAuthRoutingModule, CoreModule],
})
export class AdminAuthModule {}
