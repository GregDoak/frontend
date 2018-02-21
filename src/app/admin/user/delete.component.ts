import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-user-delete',
  templateUrl: 'delete.component.html'
})
export class AdminUserDeleteComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
