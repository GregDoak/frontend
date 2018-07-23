import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/security/user/user.interface';
import {UserService} from '../../../interfaces/security/user/user.service';
import * as moment from 'moment';
import {EventInterface} from '../../../interfaces/my/event/event.interface';
import {MyEventService} from './event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-event-create',
  templateUrl: 'create.component.html',
  providers: [MyEventService, UserService]
})
export class MyEventCreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public initialStartDateTime = this.getInitialDate(null);
  public initialEndDateTime = this.getInitialDate(this.initialStartDateTime);
  public processing = false;
  public submitted = false;
  public users: UserInterface[] = [];

  constructor(
    public alertService: AlertService,
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public loadingService: LoadingService,
    private myEventService: MyEventService,
    private router: Router,
    private userService: UserService
  ) {
    this.createForm = this.formBuilder.group({
      description: [null, Validators.required],
      location: [null, Validators.required],
      startDate: [this.initialStartDateTime, Validators.required],
      startTime: [this.initialStartDateTime, Validators.required],
      endDate: [this.initialEndDateTime, Validators.required],
      endTime: [this.initialEndDateTime, Validators.required],
      users: [null]
    });
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Generating the form...');
    this.userService.getSimilarAccessUsers().subscribe(
      (response) => {
        this.users = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );

    this.loadingService.clear();
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.loadingService.show('Saving your Event...');
      this.processing = true;

      const startDate = moment(form.value.startDate);
      const startTime = moment(form.value.startTime);
      startDate.hours(startTime.hours()).minutes(startTime.minutes());

      const endDate = moment(form.value.endDate);
      const endTime = moment(form.value.endTime);
      endDate.hours(endTime.hours()).minutes(endTime.minutes());

      const event: EventInterface = {
        description: form.value.description,
        location: form.value.location,
        startDateTime: startDate.format('Y-MM-DD HH:mm:ss'),
        endDateTime: endDate.format('Y-MM-DD HH:mm:ss'),
        users: form.value.users
      };

      this.myEventService.create(event).subscribe(
        (response) => {
          this.alertService.handleSuccess(response);
          this.loadingService.clear();
          this.router.navigate(['/my/events']).catch(() => 'Routing Error');
        },
        (error) => {
          this.processing = false;
          this.alertService.handleError(error);
          this.loadingService.clear();
        }
      );
    }
  }

  private getInitialDate(date) {
    if (date === null) {
      date = new Date();
    } else {
      date = new Date(date.valueOf());
    }

    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }
}
