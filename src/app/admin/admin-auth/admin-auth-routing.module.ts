import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAuthComponent,
    data: { parent: 'admin', breadcrumb: 'Users', title: '' },
    children: [
      {
        path: 'login',
        component: AdminLoginComponent,
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
        path: 'register',
        component: AdminRegisterComponent,
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
export class AdminAuthRoutingModule { }
