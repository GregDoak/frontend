import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: 'create.component.html'
})
export class AdminUserCreateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
