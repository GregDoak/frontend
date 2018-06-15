import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/users').pipe();
  }

  public getUser(user: UserInterface): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'admin/user/' + user.id).pipe();
  }

  public create(user: UserInterface): Observable<object> {
    return this.http.post('http://localhost:8000/api/' + 'admin/user', user).pipe();
  }

  public update(user: UserInterface): Observable<object> {
    return this.http.put('http://localhost:8000/api/' + 'admin/user/' + user.id, user).pipe();
  }

  public delete(user: UserInterface): Observable<object> {
    return this.http.delete('http://localhost:8000/api/' + 'admin/user/' + user.id).pipe();
  }
}
