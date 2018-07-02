import {Component} from '@angular/core';
import {AuthenticationService} from '../../../../core/authentication/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from '../../../../utilities/loading/loading.service';
import {CronJobTaskService} from './cron-job-task.service';
import {CronJobTaskInterface} from './cron-job-task.interface';
import {AlertService} from '../../../../utilities/alert/alert.service';
import * as moment from 'moment';

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
    const initialStartTime = new Date();
    initialStartTime.setSeconds(0);
    this.createForm = this.formBuilder.group({
      command: [null, Validators.required],
      startDate: [new Date(), Validators.required],
      startTime: [initialStartTime, Validators.required],
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
      let startTime = form.value.startTime;
      startDate = startDate === null ? moment() : moment(startDate);
      startTime = startTime === null ? moment() : moment(startTime);
      startDate.hours(startTime.hours()).minutes(startTime.minutes()).seconds(startTime.seconds());

      const cronJobTask: CronJobTaskInterface = {
        command: form.value.command,
        startDate: startDate.format('Y-MM-DD HH:mm:ss'),
        intervalPeriod: form.value.intervalPeriod,
        intervalContext: form.value.intervalContext,
        priority: form.value.priority
      };
      this.cronJobTaskService.create(cronJobTask).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/admin/cron-job-tasks']).catch(() => 'Routing Error');
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
