import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { UserService } from '../../entity/security/user/user.service';
import { UserInterface } from '../../entity/security/user/user.interface';
import { AlertService } from '../../utility/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../utility/loading/loading.service';

@Component({
  selector: 'app-admin-user-delete',
  templateUrl: 'delete.component.html',
  providers: [UserService]
})
export class AdminUserDeleteComponent implements OnInit, OnDestroy {
  public processing = false;
  public user: UserInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              private router: Router,
              private userService: UserService) {
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Getting the user...');
    let user: UserInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.userService.getUser(user).subscribe(
      (response) => {
        this.user = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit() {
    this.loadingService.show('Deleting User...');
    this.processing = true;
    let user: UserInterface = {
      id: this.user.id
    };
    this.userService.delete(user).subscribe(
      (response) => {
        this.alertService.handleSuccess(response);
        this.loadingService.clear();
        this.router.navigate(['/admin/users']).catch(() => 'Routing Error');
      },
      (error) => {
        this.processing = false;
        this.alertService.handleError(error);
        this.loadingService.clear();
      }
    );

  }
}
