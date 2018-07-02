import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AuditLogService} from './audit-log.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {AuditLogInterface} from './audit-log.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-audit-detail',
  templateUrl: 'detail.component.html',
  providers: [AuditLogService]
})
export class AdminAuditDetailComponent implements OnInit, OnDestroy {

  public auditLog: AuditLogInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              private auditLogService: AuditLogService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the audit log');

    const auditLog: AuditLogInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.auditLogService.getAuditLog(auditLog).subscribe(
      (response) => {
        this.auditLog = response['data'];
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

