import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-cron-list',
  templateUrl: 'list.component.html'
})
export class AdminCronListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
