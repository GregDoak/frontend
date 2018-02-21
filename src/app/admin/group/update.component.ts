import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-group-update',
  templateUrl: 'update.component.html'
})
export class AdminGroupUpdateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
