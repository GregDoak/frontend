import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-group-create',
  templateUrl: 'create.component.html'
})
export class AdminGroupCreateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
