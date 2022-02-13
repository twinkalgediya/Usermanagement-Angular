import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/service/auth/auth-guard.service';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canActivateChild:[AuthGuardService],
    component: UserManagementComponent,
    data: { parent: 'admin', breadcrumb: 'Users', title: '' },
    children: [
      {
        path: 'users',
        component: AdminUserListComponent,
        data: {
          breadcrumb: 'Users',
          title: 'Users',
          parent: 'admin',
        },
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'users/:id',
        component: AdminUserCreateComponent,
        data: {
          breadcrumb: 'Users',
          title: 'Users',
          parent: 'admin',
        },
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
