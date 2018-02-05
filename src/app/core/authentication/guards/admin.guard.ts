import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
// import { AlertService } from '../../alert/alert.service';
// import * as global from '../../../app.globals';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService/*,
    private alertService: AlertService*/) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authenticationService.isLoggedIn() &&
      this.authenticationService.isMemberOf('ROLE_ADMIN')
    ) {
      return true;
    }
    /*
    this.alertService.showAlert(
      'danger',
      global.unauthorisedMessage,
      global.unauthorisedMessages)
    ;*/
    return false;
  }
}
