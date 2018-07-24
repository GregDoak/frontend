import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {EventInterface} from '../../interfaces/my/event/event.interface';
import {EventTabService} from './event-tab.service';
import {AlertService} from '../alert/alert.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  providers: [EventTabService]
})
export class EventTabComponent implements OnInit, OnDestroy {
  public events: EventInterface[] = [];
  private modalReference: BsModalRef;
  private getUpcomingEventsInstance;

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private eventTabService: EventTabService,
    private modalService: BsModalService
  ) {
  }

  public cancelEvent(event: EventInterface) {
    this.eventTabService.cancel(event).subscribe(
      (response) => {
        this.closeModal();
        this.alertService.handleSuccess(response);
        this.getUpcomingEvents();
      },
      (error) => {
        this.closeModal();
        this.alertService.handleError(error);
      }
    );
  }

  public closeModal() {
    this.modalReference.hide();
  }

  public isCreatedUser(event) {
    return event.createdBy.username === this.authenticationService.getUsername();
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

  public openModal(template: TemplateRef<any>, event?: EventInterface) {
    this.modalReference = this.modalService.show(template, {class: 'modal-sm modal-dialog-centered'});
  }

  private getUpcomingEvents() {
    this.eventTabService.getUpcomingEvents().subscribe(
      (response) => {
        this.events = response['data'];
      }
    );
  }
}
