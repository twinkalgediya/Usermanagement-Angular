import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';



@NgModule({
  declarations: [
    AdminUserListComponent,
    AdminUserCreateComponent,
    
  ],
  imports: [CommonModule, UserManagementRoutingModule, CoreModule],
})
export class UserManagementModule {}
