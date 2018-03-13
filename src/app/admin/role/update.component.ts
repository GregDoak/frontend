import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../utility/loading/loading.service';
import { RoleInterface } from '../../entity/security/role/role.interface';
import { RoleService } from '../../entity/security/role/role.service';
import { AlertService } from '../../utility/alert/alert.service';

@Component({
  selector: 'app-admin-role-update',
  templateUrl: 'update.component.html',
  providers: [RoleService]
})
export class AdminRoleUpdateComponent implements OnInit, OnDestroy {
  public updateForm: FormGroup;
  public processing = false;
  public submitted = false;
  private role: RoleInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router) {
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Generating the form...');
    let role: RoleInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.roleService.getRole(role).subscribe(
      (response) => {
        this.role = response['data'];
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
      this.loadingService.show('Saving Role...');
      this.processing = true;
      let role = {
        id: this.role.id,
        title: form.value.title,
        description: form.value.description
      };
      this.roleService.update(role).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/admin/roles']).catch(() => 'Routing Error');
        },
        (error) => {
          this.processing = false;
          this.alertService.handleError(error);
          this.loadingService.clear();
        }
      );
    }
  }

  private buildForm() {
    this.updateForm = this.formBuilder.group({
      title: [this.role.title, Validators.required],
      description: [this.role.description, Validators.required]
    });
  }
}
