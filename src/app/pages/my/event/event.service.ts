import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {EventInterface} from '../../../interfaces/my/event/event.interface';

@Injectable()
export class MyEventService {

  constructor(private http: HttpClient) {
  }

  public create(event: EventInterface): Observable<object> {
    return this.http.post(environment.apiUrl + 'my/event', event).pipe();
  }
}
