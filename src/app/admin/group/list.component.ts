import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { GroupInterface } from '../../entity/security/group/group.interface';
import { GroupService } from '../../entity/security/group/group.service';
import { AlertService } from '../../utility/alert/alert.service';
import { LoadingService } from '../../utility/loading/loading.service';
import { TableService } from '../../utility/table/table.service';
import { TableColumnInterface } from '../../utility/table/table-column.interface';
import { LinkInterface } from '../../core/link/link.interface';
import { TableHeaderBrandInterface } from '../../utility/table/table-header-brand.interface';

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
