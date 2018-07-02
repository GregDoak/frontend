import {Component} from '@angular/core';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './default-main.component.html'
})
export class DefaultMainComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
