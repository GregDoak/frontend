import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {GroupInterface} from '../../../interfaces/security/group/group.interface';
import {GroupService} from './group.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {TableService} from '../../../utilities/table/table.service';
import {TableColumnInterface} from '../../../utilities/table/table-column.interface';
import {LinkInterface} from '../../../interfaces/core/link.interface';
import {TableHeaderBrandInterface} from '../../../utilities/table/table-header-brand.interface';

@Component({
  selector: 'app-admin-group-list',
  templateUrl: 'list.component.html',
  providers: [GroupService]
})
export class AdminGroupListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Groups',
    icon: 'fas fa-fw fa-users'
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
      title: 'Title',
      name: 'title'
    },
    {
      title: 'Description',
      name: 'description'
    },
    {
      title: 'Roles',
      name: null
    },
    {
      title: 'Created On',
      name: 'createdOn'
    },
    {
      title: 'Updated On',
      name: 'updatedOn'
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  public groups: GroupInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private groupService: GroupService,
              public loadingService: LoadingService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the group list...');
    this.tableService.config.exporting.filename = 'groups';

    this.groupService.getGroups().subscribe(
      (response) => {
        this.groups = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.groups);
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
