import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {EventInterface} from '../../interfaces/my/event/event.interface';

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

  public cancel(event: EventInterface) {
    return this.http.delete(environment.apiUrl + 'my/event/' + event.id).pipe();
  }
}
