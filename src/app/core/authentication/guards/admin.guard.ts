import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../../../utility/alert/alert.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isMembersOf(roles)) {
      return true;
    }

    this.alertService.show('danger', 'You do not have access to the Admin area.', []);
    return false;
  }
}
