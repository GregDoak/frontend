import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PasswordInterface } from './password.interface';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  public update(password: PasswordInterface): Observable<object> {
    return this.http.put(process.env.API_URL + 'my/password', password).pipe();
  }
}
