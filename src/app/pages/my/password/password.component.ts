import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PasswordValidator} from '../../../utilities/validators/password.validator';
import {PasswordService} from './password.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {PasswordInterface} from '../../../interfaces/my/password/password.interface';

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
