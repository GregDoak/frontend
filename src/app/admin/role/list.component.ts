import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-role-list',
  templateUrl: 'list.component.html'
})
export class AdminRoleListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
