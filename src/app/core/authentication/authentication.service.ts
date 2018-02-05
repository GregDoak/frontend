import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  public redirectUrl: string;
  private allowRefresh: boolean;
  private User: User;

  constructor(private http: HttpClient, private router: Router) {
    this.allowRefresh = true;
  }

  public login(username, password) {
    let body = JSON.stringify({username: username, password: password});
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(process.env.API_URL, body, options).pipe();

    /*
    return this.http.post(API_URL + '/api/authentication/login', body, options)
      .map((response) => response.json())
      .catch((response: any) => Observable.throw(response.json() || 'Server error'));
      */
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']).catch(() => Observable.throw('Routing Error'));
  }

  public isLoggedIn() {
    return false;
    /*
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    if (token !== null) {
      this.User = this.jwtHelper.decodeToken(token);
      if (this.jwtHelper.isTokenExpired(token)) {
        if (this.allowRefresh) {
          this.allowRefresh = false;
          this.refresh(refreshToken).subscribe(
            (response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                this.processMenu$.emit(true);
                this.allowRefresh = true;
                let redirect = this.redirectUrl ? this.redirectUrl : '';
                this.router.navigate([redirect]);

            },
            () => {
              this.allowRefresh = true;
            }
          );
        }
      }
    }
    return token !== null && refreshToken !== null && !this.jwtHelper.isTokenExpired(token);
    */
  }

  public getUsername() {
    return this.User.username;
  }

  public getRoles() {
    return this.User.roles;
  }

  public isMemberOf(member) {
    return this.User.roles.indexOf(member) > -1;
  }

  private refresh(refreshToken) {
    /*
    let body = JSON.stringify({refresh_token: refreshToken});
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'})});
    return this.http.post(API_URL + '/api/authentication/refresh', body, options)
      .map((response) => response.json())
      .catch((response: any) => Observable.throw(response.json() || 'Server error'));
      */
  }
}
