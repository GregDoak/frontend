import {Component} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';


@Component({
  selector: 'app-my-event-update',
  templateUrl: 'update.component.html'
})
export class MyEventUpdateComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
