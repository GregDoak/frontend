import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {TableService} from '../../../utilities/table/table.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {RoleService} from './role.service';
import {LinkInterface} from '../../../interfaces/core/link.interface';
import {TableColumnInterface} from '../../../utilities/table/table-column.interface';
import {TableHeaderBrandInterface} from '../../../utilities/table/table-header-brand.interface';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';

@Component({
  selector: 'app-admin-role-list',
  templateUrl: 'list.component.html',
  providers: [RoleService]
})
export class AdminRoleListComponent implements OnInit, OnDestroy {

  public tableHeaderBrand: TableHeaderBrandInterface = {
    title: 'Roles',
    icon: 'fas fa-fw fa-lock'
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

  public roles: RoleInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              public roleService: RoleService,
              public tableService: TableService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the role list...');
    this.tableService.config.exporting.filename = 'roles';

    this.roleService.getRoles().subscribe(
      (response) => {
        this.roles = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.roles);
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
