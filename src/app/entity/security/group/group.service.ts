import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupInterface } from './group.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroups(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/groups').pipe();
  }

  public getGroup(group: GroupInterface): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/group/' + group.id).pipe();
  }

  public create(group: GroupInterface): Observable<object> {
    return this.http.post('http://localhost:8000/api/' + 'admin/group', group).pipe();
  }

  public update(group: GroupInterface): Observable<object> {
    return this.http.put('http://localhost:8000/api/' + 'admin/group/' + group.id, group).pipe();
  }

  public delete(group: GroupInterface): Observable<object> {
    return this.http.delete('http://localhost:8000/api/' + 'admin/group/' + group.id).pipe();
  }
}
