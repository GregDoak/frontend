import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../core/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '../../../../utilities/loading/loading.service';
import {CronJobTaskService} from './cron-job-task.service';
import {CronJobTaskInterface} from './cron-job-task.interface';
import {AlertService} from '../../../../utilities/alert/alert.service';

@Component({
  selector: 'app-admin-cron-job-task-update',
  templateUrl: 'update.component.html',
  providers: [CronJobTaskService]
})
export class AdminCronJobTaskUpdateComponent implements OnInit, OnDestroy {
  public updateForm: FormGroup;
  public intervalContexts = ['year', 'month', 'day', 'hour', 'minute', 'second'];
  public processing = false;
  public submitted = false;
  private cronJobTask: CronJobTaskInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private cronJobTaskService: CronJobTaskService,
              private formBuilder: FormBuilder,
              public loadingService: LoadingService,
              private router: Router) {
  }

  public buildForm() {
    this.updateForm = this.formBuilder.group({
      command: [this.cronJobTask.command, Validators.required],
      intervalPeriod: [this.cronJobTask.intervalPeriod, Validators.required],
      intervalContext: [this.cronJobTask.intervalContext, Validators.required],
      priority: [this.cronJobTask.priority, Validators.required],
      active: [this.cronJobTask.active]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Generating the form...');
    const cronJobTask: CronJobTaskInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.cronJobTaskService.getCronJobTask(cronJobTask).subscribe(
      (response) => {
        this.cronJobTask = response['data'];
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
      this.loadingService.show('Saving Cron Job Task...');
      this.processing = true;
      const cronJobTask: CronJobTaskInterface = {
        id: this.cronJobTask.id,
        command: form.value.command,
        intervalPeriod: form.value.intervalPeriod,
        intervalContext: form.value.intervalContext,
        priority: form.value.priority,
        active: form.value.active
      };
      this.cronJobTaskService.update(cronJobTask).subscribe(
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
