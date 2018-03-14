import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../entity/security/user/user.interface';
import { AlertService } from '../../utility/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../entity/security/user/user.service';
import { LoadingService } from '../../utility/loading/loading.service';
import { GroupInterface } from '../../entity/security/group/group.interface';
import { RoleInterface } from '../../entity/security/role/role.interface';
import { GroupService } from '../../entity/security/group/group.service';
import { RoleService } from '../../entity/security/role/role.service';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: 'update.component.html',
  providers: [GroupService, RoleService, UserService]
})
export class AdminUserUpdateComponent implements OnInit, OnDestroy {
  public updateForm: FormGroup;
  public groups: GroupInterface[];
  public processing = false;
  public roles: RoleInterface[];
  public submitted = false;
  private user: UserInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private groupService: GroupService,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router,
              private userService: UserService) {
  }

  public buildForm() {
    this.updateForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      groups: [this.user.groups.map((group: GroupInterface) => {
        return group.id
      })],
      roles: [this.user.roles.map((role: RoleInterface) => {
        return role.id
      })]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(3);
    this.loadingService.show('Generating the form...');
    let user: UserInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.groupService.getGroups().subscribe(
      (response) => {
        this.groups = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );

    this.roleService.getRoles().subscribe(
      (response) => {
        this.roles = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );

    this.userService.getUser(user).subscribe(
      (response) => {
        this.user = response['data'];
        this.buildForm();
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Saving User...');
      this.processing = true;
      let user: UserInterface = {
        id: this.user.id,
        username: form.value.username,
        groups: form.value.groups,
        roles: form.value.roles
      };
      this.userService.update(user).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/admin/users']).catch(() => 'Routing Error');
        },
        (error) => {
          this.processing = false;
          this.alertService.handleError(error);
          this.loadingService.clear();
        }
      );
    }
  }

  public onUpdateGroup(groupId: string, action = 'add') {
    for (let group of this.groups) {
      if (group.id === groupId) {
        let groupRoles = group.roles.map((role: RoleInterface) => {
          return role.id;
        });
        let valueRoles = [];
        if (action === 'add') {
          valueRoles = this.addRoles(groupRoles);
        } else {
          valueRoles = this.removeRoles(groupRoles);
        }
        console.log(groupRoles, valueRoles, action);
        this.updateForm.get('roles').setValue(valueRoles);
      }
    }
  }

  /**
   * @param {any[]} groupRoles
   * @returns {any[]}
   */
  private removeRoles(groupRoles: any[]): any[] {
    let valueRoles = this.updateForm.get('roles').value;
    for (let roleId of groupRoles) {
      let index = valueRoles.indexOf(roleId);
      if (index > -1) {
        valueRoles.splice(index, 1);
      }
    }
    return valueRoles;
  }

  private addRoles(groupRoles: any[]): any[] {
    let valueRoles = this.updateForm.get('roles').value;
    return valueRoles.concat(groupRoles);
  }
}
