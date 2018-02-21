import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-role-delete',
  templateUrl: 'delete.component.html'
})
export class AdminRoleDeleteComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
