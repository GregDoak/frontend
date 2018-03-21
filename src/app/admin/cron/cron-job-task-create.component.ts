import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cron-job-task-create',
  templateUrl: 'cron-job-task-create.component.html',
  providers: []
})
export class AdminCronJobTaskCreateComponent {
  public createForm: FormGroup;
  public processing = false;
  public submitted = false;

  constructor(public authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm = this.formBuilder.group({
      command: [null, Validators.required],
      startDate: [null],
      intervalPeriod: [null, Validators.required],
      intervalContext: [null, Validators.required],
      priority: [5, Validators.required]
    });
  }

  public onSubmit(form) {
    console.log(form);
  }
}
