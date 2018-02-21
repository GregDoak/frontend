import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-role-update',
  templateUrl: 'update.component.html'
})
export class AdminRoleUpdateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
