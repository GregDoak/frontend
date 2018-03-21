import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CronJobTaskService {

  constructor(private http: HttpClient) {
  }

  public getCronJobTasks(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/cron-job-tasks').pipe();
  }
}
