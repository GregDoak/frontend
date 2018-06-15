import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CronJobTaskInterface } from './cron-job-task.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CronJobTaskService {

  constructor(private http: HttpClient) {
  }

  public getCronJobTasks(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/cron-job-tasks').pipe();
  }

  public getCronJobTask(cronJobTask: CronJobTaskInterface): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/cron-job-task/' + cronJobTask.id).pipe();
  }

  public create(cronJobTask: CronJobTaskInterface): Observable<object> {
    return this.http.post('http://localhost:8000/api/' + 'admin/cron-job-task', cronJobTask).pipe();
  }

  public update(cronJobTask: CronJobTaskInterface): Observable<object> {
    return this.http.put('http://localhost:8000/api/' + 'admin/cron-job-task/' + cronJobTask.id, cronJobTask).pipe();
  }
}
