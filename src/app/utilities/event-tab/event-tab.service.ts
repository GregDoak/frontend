import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class EventTabService {

  constructor(private http: HttpClient) {
  }

  public getUpcomingEvents(): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        ignoreLoadingBar: ''
      })
    };

    return this.http.get(environment.apiUrl + 'my/events/upcoming', options).pipe();
  }
}
