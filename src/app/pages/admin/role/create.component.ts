import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';
import {RoleService} from './role.service';
import {AlertService} from '../../../utilities/alert/alert.service';

@Component({
  selector: 'app-admin-role-create',
  templateUrl: 'create.component.html',
  providers: [RoleService]
})
export class AdminRoleCreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public processing = false;
  public submitted = false;
  private role: RoleInterface;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router) {

    this.createForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(1000)]]
    });
  }

  public ngOnInit() {
    this.loadingService.clear();
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Saving Role...');
      this.processing = true;
      this.role = {
        title: form.value.title,
        description: form.value.description
      };
      this.roleService.create(this.role).subscribe(
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
}
