import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AlertService } from '../../utility/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../utility/loading/loading.service';
import { GroupService } from '../../entity/security/group/group.service';
import { GroupInterface } from '../../entity/security/group/group.interface';

@Component({
  selector: 'app-admin-group-delete',
  templateUrl: 'delete.component.html',
  providers: [GroupService]
})
export class AdminGroupDeleteComponent implements OnInit, OnDestroy {
  public group: GroupInterface;
  public processing = false;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              private groupService: GroupService,
              public loadingService: LoadingService,
              private router: Router) {
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Getting the role...');
    const group: GroupInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.groupService.getGroup(group).subscribe(
      (response) => {
        this.group = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit() {
    this.loadingService.show('Deleting Group...');
    this.processing = true;
    this.groupService.delete(this.group).subscribe(
      (response) => {
        this.alertService.handleSuccess(response);
        this.loadingService.clear();
        this.router.navigate(['/admin/groups']).catch(() => 'Routing Error');
      },
      (error) => {
        this.processing = false;
        this.alertService.handleError(error);
        this.loadingService.clear();
      }
    );
  }
}
