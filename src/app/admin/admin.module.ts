import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminAuthRoutingModule } from './admin-auth/admin-auth-routing.module';
import { UserManagementRoutingModule } from './user-management/user-management-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AdminAuthComponent, UserManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminAuthRoutingModule,
    UserManagementRoutingModule,
    CoreModule,
  ],
})
export class AdminModule {}
