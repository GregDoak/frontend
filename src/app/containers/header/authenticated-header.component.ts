import {Component} from '@angular/core';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-authenticated-header',
  templateUrl: './authenticated-header.component.html'
})
export class AuthenticatedHeaderComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
