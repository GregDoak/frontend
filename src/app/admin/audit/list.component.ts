import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AlertService } from '../../utility/alert/alert.service';
import { LoadingService } from '../../utility/loading/loading.service';
import { TableService } from '../../utility/table/table.service';
import { AuditLogService } from './audit-log.service';
import { TableHeaderBrandInterface } from '../../utility/table/table-header-brand.interface';
import { TableColumnInterface } from '../../utility/table/table-column.interface';
import { AuditLogInterface } from './audit-log.interface';

@Component({
  selector: 'app-admin-audit-list',
  templateUrl: 'list.component.html',
  providers: [AuditLogService]
})
export class AdminAuditListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Audit Logs',
    icon: 'fas fa-fw fa-history'
  };

  public columns: TableColumnInterface[] = [
    {
      title: 'Event',
      name: null,
      class: 'w-50'
    },
    {
      title: 'Changes',
      name: 'changes'
    },
    {
      title: 'UpdatedOn',
      name: 'updatedOn'
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  public auditLogs: AuditLogInterface[];

  constructor(public alertService: AlertService,
              private auditLogService: AuditLogService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the audit log list...');
    this.tableService.config.exporting.enabled = false;
    this.tableService.config.toggling.enabled = false;

    this.auditLogService.getAuditLogs().subscribe(
      (response) => {
        this.auditLogs = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.auditLogs);
        this.tableService.onSortColumn(this.columns[2], 'desc');
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
