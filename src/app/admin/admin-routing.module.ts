import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-auth/admin-auth.module').then(
        (mod) => mod.AdminAuthModule
      ),
    data: {
      breadcrumb: 'Admin Auth',
      parent: 'admin',
      title: 'Admin Auth',
    },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (mod) => mod.UserManagementModule
      ),
    data: {
      breadcrumb: 'User Management',
      parent: '',
      title: 'User Management',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
