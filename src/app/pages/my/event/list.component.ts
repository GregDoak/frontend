import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {TableService} from '../../../utilities/table/table.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {MyEventService} from './event.service';
import {EventInterface} from '../../../interfaces/my/event/event.interface';
import {TableColumnInterface} from '../../../utilities/table/table-column.interface';
import {LinkInterface} from '../../../interfaces/core/link.interface';
import {TableHeaderBrandInterface} from '../../../utilities/table/table-header-brand.interface';


@Component({
  selector: 'app-my-event-list',
  templateUrl: 'list.component.html',
  providers: [MyEventService]
})
export class MyEventListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Events',
    icon: 'far fa-fw fa-calendar'
  };

  public tableHeaderLinks: LinkInterface[] = [
    {
      url: 'create',
      title: 'Create',
      icon: 'fas fa=fw fa-plus-circle'
    }
  ];

  public columns: TableColumnInterface[] = [
    {
      title: 'Description',
      name: 'description'
    },
    {
      title: 'Location',
      name: 'location'
    },
    {
      title: 'Start Date',
      name: 'startDateTime'
    },
    {
      title: 'End Date',
      name: 'endDateTime'
    },
    {
      title: 'Participants',
      name: 'users'
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  private events: EventInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private myEventService: MyEventService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting your events...');
    this.tableService.config.exporting.filename = 'events';

    this.myEventService.getEvents().subscribe(
      (response) => {
        this.events = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.events);
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear();
    this.loadingService.clear();
  }
}
