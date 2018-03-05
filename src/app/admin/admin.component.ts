import { Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { MenuService } from '../core/menu/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  constructor(public authenticationService: AuthenticationService, public menuService: MenuService) {
  }
}
