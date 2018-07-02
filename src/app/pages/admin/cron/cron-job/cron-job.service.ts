import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CronJobInterface} from './cron-job.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class CronJobService {

  constructor(private http: HttpClient) {
  }

  public getCronJobs(): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/cron-jobs').pipe();
  }

  public getCronJob(cronjob: CronJobInterface): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/cron-job/' + cronjob.id).pipe();
  }
}
