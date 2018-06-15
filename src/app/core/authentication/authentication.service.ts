import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterface } from './token.interface';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { LoadingService } from '../../utility/loading/loading.service';

@Injectable()
export class AuthenticationService {
  public redirectUrl: string;
  private allowRefresh: boolean;
  private token: TokenInterface;

  /**
   * @param {HttpClient} http
   * @param {JwtHelperService} jwtHelperService
   * @param {LoadingService} loadingService
   * @param {Router} router
   */
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.allowRefresh = true;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event: NavigationEnd) => {
        if (event.url !== '/login') {
          this.redirectUrl = event.url;
        }
      });
  }

  /**
   * @returns {string}
   */
  public static getRefreshTokenFromLocalStorage(): string {
    return localStorage.getItem('refresh_token');
  }

  /**
   * @returns {string}
   */
  public static getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Observable<object>}
   */
  public login(username: string, password: string): Observable<object> {
    const body = JSON.stringify({username: username, password: password});
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('http://localhost:8000/api/' + 'authentication/login', body, options).pipe();
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
    const token = AuthenticationService.getTokenFromLocalStorage();
    const refreshToken = AuthenticationService.getRefreshTokenFromLocalStorage();
    if (token !== null) {
      this.token = this.jwtHelperService.decodeToken(token);
      if (this.jwtHelperService.isTokenExpired(token) && this.allowRefresh) {
        this.loadingService.show('Getting a new login token...');
        this.allowRefresh = false;
        this.refresh(refreshToken).subscribe(
          (response) => {
            localStorage.setItem('token', response['data'].token);
            localStorage.setItem('refresh_token', response['data'].refresh_token);
            this.allowRefresh = true;
            const redirect = this.redirectUrl ? this.redirectUrl : '';
            this.router.navigate([redirect]).catch(() => 'Routing Error');
            this.loadingService.clear();
          },
          () => {
            this.loadingService.clear();
            this.allowRefresh = true;
            this.logout();
          }
        );
      }
    }

    return token !== null && refreshToken !== null && !this.jwtHelperService.isTokenExpired(token);
  }

  /**
   * @param {string} member
   * @returns {boolean}
   */
  public isMemberOf(member: string): boolean {
    return this.token.roles.indexOf(member) > -1;
  }

  /**
   * @param {string[]} members
   * @returns {boolean}
   */
  public isMembersOf(members: string[]): boolean {
    for (const member of members) {
      if (this.isMemberOf(member)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {string} refreshToken
   * @returns {Observable<object>}
   */
  private refresh(refreshToken: string): Observable<object> {
    const body = JSON.stringify({refresh_token: refreshToken});
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('http://localhost:8000/api/' + 'authentication/refresh', body, options).pipe();
  }
}
