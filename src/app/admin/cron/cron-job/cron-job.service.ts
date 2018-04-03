import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CronJobInterface } from './cron-job.interface';

@Injectable()
export class CronJobService {

  constructor(private http: HttpClient) {
  }

  public getCronJobs(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/cron-jobs').pipe();
  }

  public getCronJob(cronjob: CronJobInterface): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/cron-job/' + cronjob.id).pipe();
  }
}