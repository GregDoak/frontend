import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-role-create',
  templateUrl: 'create.component.html'
})
export class AdminRoleCreateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
