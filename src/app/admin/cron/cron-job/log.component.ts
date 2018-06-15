import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { CronJobService } from './cron-job.service';
import { AlertService } from '../../../utility/alert/alert.service';
import { LoadingService } from '../../../utility/loading/loading.service';
import { CronJobInterface } from './cron-job.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-cron-job-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.css'],
  providers: [CronJobService]
})
export class AdminCronJobLogComponent implements OnInit, OnDestroy {

  public cronJobs: CronJobInterface[];

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private cronJobService: CronJobService,
              public loadingService: LoadingService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the cron job logs...');

    const cronJob: CronJobInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.cronJobService.getCronJob(cronJob).subscribe(
      (response) => {
        this.cronJobs = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear();
    this.loadingService.clear();
  }
}
