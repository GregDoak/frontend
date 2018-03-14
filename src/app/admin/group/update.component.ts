import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AlertService } from '../../utility/alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../entity/security/group/group.service';
import { RoleService } from '../../entity/security/role/role.service';
import { GroupInterface } from '../../entity/security/group/group.interface';
import { LoadingService } from '../../utility/loading/loading.service';
import { RoleInterface } from '../../entity/security/role/role.interface';

@Component({
  selector: 'app-admin-group-update',
  templateUrl: 'update.component.html',
  providers: [GroupService, RoleService]
})
export class AdminGroupUpdateComponent implements OnInit, OnDestroy {
  public processing = false;
  public roles: RoleInterface[];
  public submitted = false;
  public updateForm: FormGroup;
  private group: GroupInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private groupService: GroupService,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router) {
  }

  public buildForm() {
    this.updateForm = this.formBuilder.group({
      title: [this.group.title, Validators.required],
      description: [this.group.description, Validators.required],
      roles: [this.group.roles.map((role: RoleInterface) => {
        return role.id
      })]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(2);
    this.loadingService.show('Generating the form...');

    let group: GroupInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.groupService.getGroup(group).subscribe(
      (response) => {
        this.group = response['data'];
        this.buildForm();
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
      this.loadingService.show('Saving Group...');
      this.processing = true;
      this.group = {
        id: this.group.id,
        title: form.value.title,
        description: form.value.description,
        roles: form.value.roles
      };
      this.groupService.update(this.group).subscribe(
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
