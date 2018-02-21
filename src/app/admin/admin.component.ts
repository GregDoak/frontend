import { Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
