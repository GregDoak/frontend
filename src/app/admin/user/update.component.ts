import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: 'update.component.html'
})
export class AdminUserUpdateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
