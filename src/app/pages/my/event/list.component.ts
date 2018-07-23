import {Component} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';


@Component({
  selector: 'app-my-event-list',
  templateUrl: 'list.component.html'
})
export class MyEventListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
