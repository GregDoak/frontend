import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../utility/alert/alert.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { LoadingService } from '../../utility/loading/loading.service';
import { UserService } from '../../entity/security/user/user.service';
import { UserInterface } from '../../entity/security/user/user.interface';
import { TableService } from '../../utility/table/table.service';
import { TableColumnInterface } from '../../utility/table/table-column.interface';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: 'list.component.html',
  providers: [TableService, UserService]
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  public columns: TableColumnInterface[] = [
    {
      title: 'Username',
      name: 'username'
    },
    {
      title: 'Login Count',
      name: 'loginCount'
    },
    {
      title: 'Last Login',
      name: 'lastLogin'
    },
    {
      title: 'Security Roles',
      name: null
    },
    {
      title: 'Actions',
      name: null
    }
  ];

  public users: UserInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              public tableService: TableService,
              public userService: UserService) {
  }

  public ngOnInit() {
    this.loadingService.show('Getting the users list...');

    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response['data'];
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.users);
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
