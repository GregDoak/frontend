import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
  public redirectUrl: string;
  private allowRefresh: boolean;
  private User: User;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private router: Router) {
    this.allowRefresh = true;
  }

  public login(username, password): Observable<object> {
    let body = JSON.stringify({username: username, password: password});
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(process.env.API_URL + 'authentication/login', body, options).pipe();
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {

    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    // console.log(token);
    // console.log(this.jwtHelperService.decodeToken(token));
    return false;

    // return token !== null && refreshToken !== null && !this.jwtHelperService.isTokenExpired(token);
  }

  public getUsername(): string {
    return this.User.username;
  }

  public getRoles(): string[] {
    return this.User.roles;
  }

  public isMemberOf(member): boolean {
    return this.User.roles.indexOf(member) > -1;
  }

  private refresh(refreshToken): void {
    /*
    let body = JSON.stringify({refresh_token: refreshToken});
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'})});
    return this.http.post(API_URL + '/api/authentication/refresh', body, options)
      .map((response) => response.json())
      .catch((response: any) => Observable.throw(response.json() || 'Server error'));
      */
  }
}
