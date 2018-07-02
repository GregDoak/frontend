import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupService} from './group.service';
import {RoleService} from '../role/role.service';
import {GroupInterface} from '../../../interfaces/security/group/group.interface';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';

@Component({
  selector: 'app-admin-group-create',
  templateUrl: 'create.component.html',
  providers: [GroupService, RoleService]
})
export class AdminGroupCreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public processing = false;
  public roles: RoleInterface[];
  public submitted = false;
  private group: GroupInterface;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private groupService: GroupService,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router) {

    this.createForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      roles: [null]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Generating the form...');

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
      this.loadingService.show('Saving Group...');
      this.processing = true;
      this.group = {
        title: form.value.title,
        description: form.value.description,
        roles: form.value.roles
      };
      this.groupService.create(this.group).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/admin/groups']).catch(() => 'Routing Error');
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
