import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenInterface } from './token.interface';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {
  }

  public getTokens(): Observable<object> {
    return this.http.get(process.env.API_URL + 'my/tokens').pipe();
  }

  public delete(token: TokenInterface): Observable<object> {
    return this.http.delete(process.env.API_URL + 'my/token/' + token.id).pipe();
  }

  public deleteAll(): Observable<object> {
    return this.http.delete(process.env.API_URL + 'my/tokens').pipe();
  }

}
