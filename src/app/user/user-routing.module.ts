import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/service/auth/auth-guard.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserComponent } from './user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { parent: 'admin', breadcrumb: 'Users', title: '' },
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
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
        component: UserRegistrationComponent,
        data: {
          breadcrumb: 'View Coupon Detail',
          title: 'View Coupon Detail',
          parent: 'admin',
        },
      },
      {
        path: 'register',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        canActivate:[AuthGuardService],
        component: WelcomeComponent,
        data: {
          breadcrumb: 'Welcome',
          title: 'Welcome',
          parent: 'admin',
        },
      },
      {
        path: 'welcome',
        redirectTo: 'wellcome',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
