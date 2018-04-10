import { Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-my',
  templateUrl: 'my.component.html'
})
export class MyComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
