import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getSimilarAccessUsers(): Observable<object> {
    return this.http.get(environment.apiUrl + 'my/similar-access-users').pipe();
  }
}
