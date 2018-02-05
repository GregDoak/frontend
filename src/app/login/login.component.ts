import {
  Component
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})
export class LoginComponent {

  public loginForm: FormGroup;
  public processing: boolean;
  public submitted: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {

    /*
    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    */

    this.processing = false;
    this.submitted = false;

  }

  public onSubmit(form) {
    this.submitted = true;
    console.log(form);
    /*
    if (form.valid) {
      this.processing = true;
      this.authentication.login(form.value.username, form.value.password).subscribe(
        (response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          this.authentication.processMenu$.emit(true);
          let redirect = this.authentication.redirectUrl ? this.authentication.redirectUrl : '';
          this.router.navigate([redirect]);
        },
        (error) => {
          this.processing = false;
          this.alert.handleError(error);
        });
    }
    */
  }
}
