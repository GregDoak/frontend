import {Component} from '@angular/core';
import {AuthenticationService} from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
