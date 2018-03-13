import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AlertService } from '../../utility/alert/alert.service';
import { LoadingService } from '../../utility/loading/loading.service';
import { TableService } from '../../utility/table/table.service';
import { AuditLogService } from './audit-log.service';

@Component({
  selector: 'app-admin-audit-list',
  templateUrl: 'list.component.html',
  providers: [AuditLogService]
})
export class AdminAuditListComponent implements OnInit, OnDestroy {

  public auditLogs: any[];

  constructor(public alertService: AlertService,
              private auditLogService: AuditLogService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the role list...');
    this.tableService.config.exporting.filename = 'roles';

    this.auditLogService.getAuditLogs().subscribe(
      (response) => {
        this.auditLogs = response['data'];
        this.tableService.setColumns([]);
        this.tableService.setData(this.auditLogs);
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
