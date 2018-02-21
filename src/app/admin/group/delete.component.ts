import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-group-delete',
  templateUrl: 'delete.component.html'
})
export class AdminGroupDeleteComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
