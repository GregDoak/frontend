import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditLogInterface } from './audit-log.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuditLogService {

  constructor(private http: HttpClient) {
  }

  public getAuditLogs(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/audit-logs').pipe();
  }

  public getAuditLog(auditLog: AuditLogInterface): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/audit-log/' + auditLog.id).pipe();
  }
}
