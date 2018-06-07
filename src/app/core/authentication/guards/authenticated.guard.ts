import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  /**
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isMembersOf(roles)) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authenticationService.redirectUrl = state.url;

    // Navigate to the login page
    this.router.navigate(['login']).catch(() => 'Routing Error');
    return false;
  }
}
