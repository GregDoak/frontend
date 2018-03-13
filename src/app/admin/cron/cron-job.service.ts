import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CronJobService {

  constructor(private http: HttpClient) {
  }

  public getCronJobs(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/cron-jobs').pipe();
  }
}
