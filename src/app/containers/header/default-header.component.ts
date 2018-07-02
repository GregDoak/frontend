import {Component} from '@angular/core';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
