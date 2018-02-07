import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: 'list.component.html'
})
export class AdminUserListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
