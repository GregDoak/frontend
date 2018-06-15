import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenInterface } from './token.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {
  }

  public getTokens(): Observable<object> {
    return this.http.get('http://localhost:8000/api/' + 'my/tokens').pipe();
  }

  public delete(token: TokenInterface): Observable<object> {
    return this.http.delete('http://localhost:8000/api/' + 'my/token/' + token.id).pipe();
  }

  public deleteAll(): Observable<object> {
    return this.http.delete('http://localhost:8000/api/' + 'my/tokens').pipe();
  }

}
