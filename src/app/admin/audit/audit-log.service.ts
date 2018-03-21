import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuditLogInterface } from './audit-log.interface';

@Injectable()
export class AuditLogService {

  constructor(private http: HttpClient) {
  }

  public getAuditLogs(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/audit-logs').pipe();
  }

  public getAuditLog(auditLog: AuditLogInterface): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/audit-log/' + auditLog.id).pipe();
  }
}
