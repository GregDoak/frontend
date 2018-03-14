import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GroupInterface } from './group.interface';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroups(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/groups').pipe();
  }

  public getGroup(group: GroupInterface): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/group/' + group.id).pipe();
  }

  public create(group: GroupInterface): Observable<object> {
    return this.http.post(process.env.API_URL + 'admin/group', group).pipe();
  }

  public update(group: GroupInterface): Observable<object> {
    return this.http.put(process.env.API_URL + 'admin/group/' + group.id, group).pipe();
  }

  public delete(group: GroupInterface): Observable<object> {
    return this.http.delete(process.env.API_URL + 'admin/group/' + group.id).pipe();
  }
}
