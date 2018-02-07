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

  /**
   * @param {HttpClient} http
   * @param {JwtHelperService} jwtHelperService
   * @param {Router} router
   */
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private router: Router) {
    this.allowRefresh = true;
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Observable<object>}
   */
  public login(username: string, password: string): Observable<object> {
    let body = JSON.stringify({username: username, password: password});
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(process.env.API_URL + 'authentication/login', body, options).pipe();
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']).catch(() => 'Routing Error');
  }

  /**
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    if (token !== null) {
      this.User = this.jwtHelperService.decodeToken(token);
      if (this.jwtHelperService.isTokenExpired(token) && this.allowRefresh) {
        this.allowRefresh = false;
        this.refresh(refreshToken).subscribe(
          (response) => {
            localStorage.setItem('token', response['data'].token);
            localStorage.setItem('refresh_token', response['data'].refresh_token);
            this.allowRefresh = true;
            let redirect = this.redirectUrl ? this.redirectUrl : '';
            this.router.navigate([redirect]).catch(() => 'Routing Error');

          },
          () => {
            this.allowRefresh = true;
            this.logout();
          }
        );
      }
    }

    return token !== null && refreshToken !== null && !this.jwtHelperService.isTokenExpired(token);
  }

  /**
   * @returns {string}
   */
  public getUsername(): string {
    return this.User.username;
  }

  /**
   * @returns {string[]}
   */
  public getRoles(): string[] {
    return this.User.roles;
  }

  /**
   * @param {string} member
   * @returns {boolean}
   */
  public isMemberOf(member: string): boolean {
    return this.User.roles.indexOf(member) > -1;
  }

  /**
   * @param {string} refreshToken
   * @returns {Observable<object>}
   */
  private refresh(refreshToken: string): Observable<object> {
    let body = JSON.stringify({refresh_token: refreshToken});
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(process.env.API_URL + 'authentication/refresh', body, options).pipe();
  }
}