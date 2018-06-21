import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupInterface} from './group.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroups(): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/groups').pipe();
  }

  public getGroup(group: GroupInterface): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/group/' + group.id).pipe();
  }

  public create(group: GroupInterface): Observable<object> {
    return this.http.post(environment.apiUrl + 'admin/group', group).pipe();
  }

  public update(group: GroupInterface): Observable<object> {
    return this.http.put(environment.apiUrl + 'admin/group/' + group.id, group).pipe();
  }

  public delete(group: GroupInterface): Observable<object> {
    return this.http.delete(environment.apiUrl + 'admin/group/' + group.id).pipe();
  }
}
