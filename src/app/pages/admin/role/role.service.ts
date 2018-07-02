import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/roles').pipe();
  }

  public getRole(role: RoleInterface): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/role/' + role.id).pipe();
  }

  public create(role: RoleInterface): Observable<object> {
    return this.http.post(environment.apiUrl + 'admin/role', role).pipe();
  }

  public update(role: RoleInterface): Observable<object> {
    return this.http.put(environment.apiUrl + 'admin/role/' + role.id, role).pipe();
  }

  public delete(role: RoleInterface): Observable<object> {
    return this.http.delete(environment.apiUrl + 'admin/role/' + role.id).pipe();
  }
}
