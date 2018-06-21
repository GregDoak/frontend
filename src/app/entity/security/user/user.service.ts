import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from './user.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/users').pipe();
  }

  public getUser(user: UserInterface): Observable<object> {
    return this.http.get(environment.apiUrl + 'admin/user/' + user.id).pipe();
  }

  public create(user: UserInterface): Observable<object> {
    return this.http.post(environment.apiUrl + 'admin/user', user).pipe();
  }

  public update(user: UserInterface): Observable<object> {
    return this.http.put(environment.apiUrl + 'admin/user/' + user.id, user).pipe();
  }

  public delete(user: UserInterface): Observable<object> {
    return this.http.delete(environment.apiUrl + 'admin/user/' + user.id).pipe();
  }
}
