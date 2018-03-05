import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/roles').pipe();
  }
}
