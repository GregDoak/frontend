import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenInterface} from '../../../interfaces/my/token/token.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {
  }

  public getTokens(): Observable<object> {
    return this.http.get(environment.apiUrl + 'my/tokens').pipe();
  }

  public delete(token: TokenInterface): Observable<object> {
    return this.http.delete(environment.apiUrl + 'my/token/' + token.id).pipe();
  }

  public deleteAll(): Observable<object> {
    return this.http.delete(environment.apiUrl + 'my/tokens').pipe();
  }

}
