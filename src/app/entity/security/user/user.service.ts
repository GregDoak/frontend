import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/users').pipe();
  }

  public getUser(user: UserInterface): Observable<object> {
    return this.http.get(process.env.API_URL + 'admin/user/' + user.id).pipe();
  }

  public create(user: UserInterface): Observable<object> {
    return this.http.post(process.env.API_URL + 'admin/user', user).pipe();
  }

  public update(user: UserInterface): Observable<object> {
    return this.http.put(process.env.API_URL + 'admin/user/' + user.id, user).pipe();
  }

  public delete(user: UserInterface): Observable<object> {
    return this.http.delete(process.env.API_URL + 'admin/user/' + user.id).pipe();
  }
}
