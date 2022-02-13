import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/service/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    data: {
      breadcrumb: 'Pickup11 Admin',
      parent: 'admin',
      title: 'Pickup11 Admin',
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
    data: {
      breadcrumb: 'User Management',
      parent: '',
      title: 'User Management',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
