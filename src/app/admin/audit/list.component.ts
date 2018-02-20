import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-admin-audit-list',
  templateUrl: 'list.component.html'
})
export class AdminAuditListComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
