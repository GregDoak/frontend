import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {MyEventService} from './event.service';
import {UserService} from '../../../interfaces/security/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../../../interfaces/security/user/user.interface';
import {AlertService} from '../../../utilities/alert/alert.service';
import {EventInterface} from '../../../interfaces/my/event/event.interface';
import * as moment from 'moment';


@Component({
  selector: 'app-my-event-update',
  templateUrl: 'update.component.html',
  providers: [MyEventService, UserService]
})
export class MyEventUpdateComponent implements OnInit, OnDestroy {
  public processing = false;
  public submitted = false;
  public updateForm: FormGroup;
  public users: UserInterface[] = [];
  private event: EventInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public loadingService: LoadingService,
    private myEventService: MyEventService,
    private router: Router,
    private userService: UserService
  ) {

  }

  public ngOnInit() {
    this.loadingService.setCounter(2);
    this.loadingService.show('Generating the form...');

    const event: EventInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.userService.getSimilarAccessUsers().subscribe(
      (response) => {
        this.users = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );

    this.myEventService.getEvent(event).subscribe(
      (response) => {
        this.event = response['data'];
        this.buildForm();
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
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
        id: this.event.id,
        description: form.value.description,
        location: form.value.location,
        startDateTime: startDate.format('Y-MM-DD HH:mm:ss'),
        endDateTime: endDate.format('Y-MM-DD HH:mm:ss'),
        users: form.value.users
      };

      this.myEventService.update(event).subscribe(
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

  private buildForm() {
    const startDate = new Date(this.event.startDateTime);
    const startTime = new Date(this.event.startDateTime);
    const endDate = new Date(this.event.endDateTime);
    const endTime = new Date(this.event.endDateTime);

    this.updateForm = this.formBuilder.group({
      description: [this.event.description, Validators.required],
      location: [this.event.location, Validators.required],
      startDate: [startDate, Validators.required],
      startTime: [startTime, Validators.required],
      endDate: [endDate, Validators.required],
      endTime: [endTime, Validators.required],
      users: [this.event.users.map((user: UserInterface) => {
        return user.id;
      })]
    });
  }
}
