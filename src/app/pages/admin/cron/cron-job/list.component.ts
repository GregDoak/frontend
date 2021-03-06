import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../core/authentication/authentication.service';
import {CronJobService} from './cron-job.service';
import {AlertService} from '../../../../utilities/alert/alert.service';
import {LoadingService} from '../../../../utilities/loading/loading.service';
import {TableService} from '../../../../utilities/table/table.service';
import {TableHeaderBrandInterface} from '../../../../utilities/table/table-header-brand.interface';
import {TableColumnInterface} from '../../../../utilities/table/table-column.interface';
import {CronJobInterface} from './cron-job.interface';

@Component({
  selector: 'app-admin-cron-job-list',
  templateUrl: 'list.component.html',
  providers: [CronJobService]
})
export class AdminCronJobListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Cron Jobs',
    icon: 'fas fa-fw fa-clock'
  };

  public columns: TableColumnInterface[] = [
    {
      title: 'Host Name',
      name: 'hostname'
    },
    {
      title: 'Process ID',
      name: 'pid'
    },
    {
      title: 'Start Date',
      name: 'startDate'
    },
    {
      title: 'End Date',
      name: 'endDate'
    },
    {
      title: 'Duration',
      name: null
    },
    {
      title: 'Jobs',
      name: 'jobs'
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  public cronJobs: CronJobInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private cronJobService: CronJobService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the cron job list...');
    this.tableService.config.exporting.filename = 'cron-jobs';

    this.cronJobService.getCronJobs().subscribe(
      (response) => {
        this.cronJobs = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.cronJobs);
        this.tableService.onSortColumn(this.columns[3], 'desc');
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
