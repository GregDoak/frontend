import {Component} from '@angular/core';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './authenticated-main.component.html'
})
export class AuthenticatedMainComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
