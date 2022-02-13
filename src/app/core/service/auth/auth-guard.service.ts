import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public router: Router, public auth: AuthService) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    ////&& route.parent.routeConfig.path == route.data.parent
    if (
      route.data &&
      route.data.parent &&
      route.parent &&
      route.parent.routeConfig
    ) {
      return true;
    } else {
      this.router.navigate(['/404']);
      // this.nav.visible = false;
      // this.nav.routerArray = [];
      return false;
    }
  }
  canActivate(): boolean {
    if (!this.auth.isUserAuthenticated()) {
      // this.nav.hide();
      this.router.navigate(['login']);
      return false;
    } else {
      // this.nav.show();
    }
    // this.nav.show();
    return true;
  }
}
