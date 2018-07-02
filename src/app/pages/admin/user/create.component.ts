import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../../utilities/alert/alert.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupInterface} from '../../../interfaces/security/group/group.interface';
import {GroupService} from '../group/group.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';
import {RoleService} from '../role/role.service';
import {Router} from '@angular/router';
import {UserInterface} from '../../../interfaces/security/user/user.interface';
import {UserService} from './user.service';
import {PasswordValidator} from '../../../utilities/validators/password.validator';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: 'create.component.html',
  providers: [GroupService, RoleService, UserService]
})
export class AdminUserCreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public groups: GroupInterface[];
  public processing = false;
  public roles: RoleInterface[];
  public submitted = false;
  private user: UserInterface;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private groupService: GroupService,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router,
              private userService: UserService) {

    this.createForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      groups: [null],
      roles: [null]
    }, {
      validator: [PasswordValidator.matchPassword]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(2);
    this.loadingService.show('Generating the form...');

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
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Saving User...');
      this.processing = true;
      this.user = {
        username: form.value.username,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
        groups: form.value.groups,
        roles: form.value.roles
      };
      this.userService.create(this.user).subscribe(
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
}
