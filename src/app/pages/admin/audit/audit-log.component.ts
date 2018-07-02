import {Component, Input, OnInit} from '@angular/core';
import {AuditLogInterface} from './audit-log.interface';

@Component({
  selector: 'app-admin-audit-log',
  templateUrl: 'audit-log.component.html'
})
export class AdminAuditLogComponent implements OnInit {
  @Input() auditLog: AuditLogInterface;
  @Input() view = 'current';

  public entity: object;
  public keys: string[];

  private allowedViews = ['snapshot', 'previous', 'current'];

  public getValue(key: string): any {
    let value = this.entity[key];
    switch (this.view) {
      case 'snapshot':
        value = this.isHighlight(key) ? this.auditLog.changes[key].new : this.entity[key];
        break;
      case 'previous':
        value = this.isHighlight(key) ? this.auditLog.changes[key].old : this.entity[key];
        break;
    }
    return this.formatValue(value);
  }

  public isDateField(key: string): boolean {
    const dateFields = ['createdOn', 'updatedOn'];
    return dateFields.indexOf(key) > -1;
  }

  public isHighlight(key: string): boolean {
    let highlight = false;
    switch (this.view) {
      case 'snapshot':
      case 'previous':
        highlight = this.auditLog.changes[key] !== undefined;
        break;
    }
    return highlight;
  }

  public isTitleArray(key: string): boolean {
    const titleFields = ['groups', 'roles'];
    return titleFields.indexOf(key) > -1;
  }

  public isUserField(key: string): boolean {
    const userFields = ['createdBy', 'updatedBy'];
    return userFields.indexOf(key) > -1;
  }

  public ngOnInit() {
    if (this.allowedViews.indexOf(this.view) < 0) {
      this.view = 'current';
    }
    this.entity = this.auditLog.source.entity;
    this.keys = Object.keys(this.entity);
  }

  private formatValue(value: any): any {
    switch (typeof value) {
      case 'undefined':
        value = null;
        break;
    }
    return value;
  }
}
