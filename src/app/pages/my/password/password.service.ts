import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PasswordInterface} from '../../../interfaces/my/password/password.interface';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  public update(password: PasswordInterface): Observable<object> {
    return this.http.put(environment.apiUrl + 'my/password', password).pipe();
  }
}
