import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { UserService } from '../../entity/security/user/user.service';
import { UserInterface } from '../../entity/security/user/user.interface';
import { LoadingService } from '../../utility/loading/loading.service';
import { AlertService } from '../../utility/alert/alert.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: 'list.component.html',
  providers: [UserService]
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  public users: UserInterface[];

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              public userService: UserService) {
  }

  public ngOnInit() {
    this.loadingService.showLoading('Getting the users list...');

    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response['data'];
        this.loadingService.clearLoading();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clearAlert();
    this.loadingService.clearLoading();
  }
}
