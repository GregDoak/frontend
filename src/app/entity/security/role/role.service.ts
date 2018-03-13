import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RoleInterface } from './role.interface';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/roles').pipe();
  }

  public getRole(role: RoleInterface): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/role/' + role.id).pipe();
  }

  public create(role: RoleInterface): Observable<object> {
    return this.http.post(process.env.API_URL + 'admin/role', role).pipe();
  }

  public update(role: RoleInterface): Observable<object> {
    return this.http.put(process.env.API_URL + 'admin/role/' + role.id, role).pipe();
  }

  public delete(role: RoleInterface): Observable<object> {
    return this.http.delete(process.env.API_URL + 'admin/role/' + role.id).pipe();
  }
}
