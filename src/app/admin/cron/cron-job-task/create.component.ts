import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../utility/loading/loading.service';
import { CronJobTaskService } from './cron-job-task.service';
import { CronJobTaskInterface } from './cron-job-task.interface';
import { AlertService } from '../../../utility/alert/alert.service';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-admin-cron-job-task-create',
  templateUrl: 'create.component.html',
  providers: [CronJobTaskService]
})
export class AdminCronJobTaskCreateComponent {
  public createForm: FormGroup;
  public intervalContexts = ['year', 'month', 'day', 'hour', 'minute', 'second'];
  public processing = false;
  public submitted = false;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private cronJobTaskService: CronJobTaskService,
              private formBuilder: FormBuilder,
              public loadingService: LoadingService,
              private router: Router) {
    this.createForm = this.formBuilder.group({
      command: [null, Validators.required],
      startDate: [null],
      intervalPeriod: [null, Validators.required],
      intervalContext: ['minute', Validators.required],
      priority: [5, Validators.required]
    });
    this.loadingService.clear();
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Saving Cron Job Task...');
      this.processing = true;
      let startDate = form.value.startDate;
      if (startDate === null) {
        startDate = moment().format('Y-MM-DD HH:mm:ss');
      }
      const cronJobTask: CronJobTaskInterface = {
        command: form.value.command,
        startDate: startDate,
        intervalPeriod: form.value.intervalPeriod,
        intervalContext: form.value.intervalContext,
        priority: form.value.priority
      };
      this.cronJobTaskService.create(cronJobTask).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/admin/cron-jobs/tasks']).catch(() => 'Routing Error');
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
