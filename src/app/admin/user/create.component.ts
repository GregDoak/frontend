import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { RoleService } from '../../entity/security/role/role.service';
import { RoleInterface } from '../role/role.interface';
import { AlertService } from '../../utility/alert/alert.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: 'create.component.html',
  providers: [RoleService]
})
export class AdminUserCreateComponent {
  public roles: RoleInterface[];

  constructor(public alertService: AlertService, public authenticationService: AuthenticationService, public roleService: RoleService) {
    roleService.getRoles().subscribe(
      (response) => this.roles = response['data'],
      (error) => alertService.handleError(error)
    );
  }
}
