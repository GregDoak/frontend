import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleInterface } from './role.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/roles').pipe();
  }

  public getRole(role: RoleInterface): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/role/' + role.id).pipe();
  }

  public create(role: RoleInterface): Observable<object> {
    return this.http.post('http://localhost:8000/api/' + 'admin/role', role).pipe();
  }

  public update(role: RoleInterface): Observable<object> {
    return this.http.put('http://localhost:8000/api/' + 'admin/role/' + role.id, role).pipe();
  }

  public delete(role: RoleInterface): Observable<object> {
    return this.http.delete('http://localhost:8000/api/' + 'admin/role/' + role.id).pipe();
  }
}
