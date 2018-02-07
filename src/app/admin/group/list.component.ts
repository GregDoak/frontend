import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-group-list',
  templateUrl: 'list.component.html'
})
export class AdminGroupListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
