import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroups(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/groups').pipe();
  }
}
