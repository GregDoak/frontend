import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../utilities/alert/alert.service';
import {AuthenticationService} from '../../core/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm: FormGroup;
  public processing: boolean;
  public submitted: boolean;

  /**
   * @param {ActivatedRoute} route
   * @param {AlertService} alertService
   * @param {AuthenticationService} authenticationService
   * @param {FormBuilder} formBuilder
   * @param {Router} router
   */
  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.processing = false;
    this.submitted = false;

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']).catch(() => 'Routing Error');
    }
  }

  /**
   * @param {FormGroup} form
   */
  public onSubmit(form: FormGroup): void {
    this.submitted = true;
    if (form.valid) {
      this.processing = true;
      this.authenticationService.login(form.value.username, form.value.password).subscribe(
        (response) => {
          AuthenticationService.setTokens(response['data'].token, response['data'].refresh_token);
          const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '';
          this.router.navigate([redirect]).catch(() => 'Routing Error');
          this.alertService.clear();
        },
        (error) => {
          this.processing = false;
          this.alertService.handleError(error);
        });
    }
  }
}
