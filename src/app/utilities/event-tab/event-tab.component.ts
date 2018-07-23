import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventInterface} from '../../interfaces/my/event/event.interface';
import {EventTabService} from './event-tab.service';

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  providers: [EventTabService]
})
export class EventTabComponent implements OnInit, OnDestroy {
  public events: EventInterface[] = [];
  private getUpcomingEventsInstance;

  constructor(private eventTabService: EventTabService) {
  }

  public isSameDay(startDateTime, endDateTime) {
    startDateTime = new Date(startDateTime);
    endDateTime = new Date(endDateTime);
    return startDateTime.getDate() === endDateTime.getDate() && startDateTime.getMonth() === endDateTime.getMonth() &&
      startDateTime.getFullYear() === endDateTime.getFullYear();
  }

  public isSameTime(startDateTime, endDateTime) {
    return startDateTime === endDateTime;
  }

  public ngOnInit() {
    this.getUpcomingEvents();
    this.getUpcomingEventsInstance = setInterval(() => {
      this.getUpcomingEvents();
    }, 60000);
  }

  public ngOnDestroy() {
    clearInterval(this.getUpcomingEventsInstance);
  }

  private getUpcomingEvents() {
    this.eventTabService.getUpcomingEvents().subscribe(
      (response) => {
        this.events = response['data'];
      }
    );
  }
}
