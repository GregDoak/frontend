import { Component, OnDestroy, OnInit } from '@angular/core';
import { PasswordValidator } from '../../utility/validators/password.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../utility/loading/loading.service';
import { AlertService } from '../../utility/alert/alert.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { PasswordInterface } from '../../entity/my/password/password.interface';
import { PasswordService } from '../../entity/my/password/password.service';

@Component({
  selector: 'app-my-password',
  templateUrl: 'password.component.html',
  providers: [PasswordService]
})
export class MyPasswordComponent implements OnInit, OnDestroy {
  public passwordForm: FormGroup;
  public processing = false;
  public submitted = false;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              public loadingService: LoadingService,
              private passwordService: PasswordService) {
    this.buildForm();
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Generating the form...');
    this.loadingService.clear();
  }

  public ngOnDestroy() {
    this.alertService.clear();
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Updating your password...');
      this.processing = true;
      const passwords: PasswordInterface = {
        currentPassword: form.value.currentPassword,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword
      };
      this.passwordService.update(passwords).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.buildForm();
        },
        (error) => {
          this.processing = false;
          this.alertService.handleError(error);
          this.loadingService.clear();
          this.buildForm();
        }
      );
    }
  }

  private buildForm() {
    this.submitted = false;
    this.processing = false;
    this.passwordForm = this.formBuilder.group({
      currentPassword: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: [PasswordValidator.matchPassword]
    });
  }
}
