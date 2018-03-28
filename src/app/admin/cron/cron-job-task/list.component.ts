import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { AlertService } from '../../../utility/alert/alert.service';
import { LoadingService } from '../../../utility/loading/loading.service';
import { TableService } from '../../../utility/table/table.service';
import { TableHeaderBrandInterface } from '../../../utility/table/table-header-brand.interface';
import { LinkInterface } from '../../../core/link/link.interface';
import { TableColumnInterface } from '../../../utility/table/table-column.interface';
import { CronJobTaskService } from './cron-job-task.service';
import { CronJobTaskInterface } from './cron-job-task.interface';

@Component({
  selector: 'app-admin-cron-job-task-list',
  templateUrl: 'list.component.html',
  providers: [CronJobTaskService]
})
export class AdminCronJobTaskListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Cron Job Tasks',
    icon: 'fas fa-fw fa-tasks'
  };

  public tableHeaderLinks: LinkInterface[] = [
    {
      url: 'create',
      title: 'Create',
      icon: 'fas fa=fw fa-plus-circle'
    }
  ];

  public columns: TableColumnInterface[] = [
    {
      title: 'Command',
      name: 'command'
    },
    {
      title: 'Start Date',
      name: 'startDate'
    },
    {
      title: 'Interval Period',
      name: 'intervalPeriod'
    },
    {
      title: 'Interval Context',
      name: 'intervalContext'
    },
    {
      title: 'Priority',
      name: 'priority'
    },
    {
      title: 'Next Run',
      name: 'nextRun'
    },
    {
      title: 'Active',
      name: 'active'
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  public cronJobTasks: CronJobTaskInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private cronJobTaskService: CronJobTaskService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the cron job list...');
    this.tableService.config.exporting.filename = 'cron-jobs';

    this.cronJobTaskService.getCronJobTasks().subscribe(
      (response) => {
        this.cronJobTasks = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.cronJobTasks);
        this.tableService.onSortColumn(this.columns[5], 'desc');
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
