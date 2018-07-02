import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {AlertService} from '../../../utilities/alert/alert.service';
import {RoleService} from './role.service';
import {RoleInterface} from '../../../interfaces/security/role/role.interface';

@Component({
  selector: 'app-admin-role-delete',
  templateUrl: 'delete.component.html',
  providers: [RoleService]
})
export class AdminRoleDeleteComponent implements OnInit, OnDestroy {
  public processing = false;
  public role: RoleInterface;

  constructor(private activatedRoute: ActivatedRoute,
              public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              private roleService: RoleService,
              private router: Router) {
  }

  public ngOnInit() {
    this.loadingService.setCounter(1);
    this.loadingService.show('Getting the role...');
    const role: RoleInterface = {
      id: this.activatedRoute.snapshot.params.id
    };

    this.roleService.getRole(role).subscribe(
      (response) => {
        this.role = response['data'];
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }

  public ngOnDestroy() {
    this.alertService.clear(5000);
  }

  public onSubmit() {
    this.loadingService.show('Deleting Role...');
    this.processing = true;
    const role: RoleInterface = {
      id: this.role.id
    };
    this.roleService.delete(role).subscribe(
      (response) => {
        this.alertService.handleSuccess(response);
        this.loadingService.clear();
        this.router.navigate(['/admin/roles']).catch(() => 'Routing Error');
      },
      (error) => {
        this.processing = false;
        this.alertService.handleError(error);
        this.loadingService.clear();
      }
    );
  }
}
