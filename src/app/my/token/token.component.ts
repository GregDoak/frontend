import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LoadingService } from '../../utility/loading/loading.service';
import { TableService } from '../../utility/table/table.service';
import { AlertService } from '../../utility/alert/alert.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { TokenService } from '../../entity/my/token/token.service';
import { TableColumnInterface } from '../../utility/table/table-column.interface';
import { TokenInterface } from '../../entity/my/token/token.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-my-token',
  templateUrl: 'token.component.html',
  providers: [TokenService]
})
export class MyTokenComponent implements OnInit, OnDestroy {
  public columns: TableColumnInterface[] = [
    {
      title: 'Operating System',
      name: 'operatingSystem'
    },
    {
      title: 'Browser',
      name: 'browser'
    },
    {
      title: 'Last Used',
      name: 'updatedOn'
    },
    {
      title: 'Valid Until',
      name: 'valid'
    },
    {
      title: 'Actions',
      name: null
    }
  ];
  public selectedToken: TokenInterface;
  public tokens: TokenInterface[];
  private modalReference: BsModalRef;
  private refreshToken: string;

  constructor(public alertService: AlertService,
              public authenticationService: AuthenticationService,
              public loadingService: LoadingService,
              private modalService: BsModalService,
              public tableService: TableService,
              private tokenService: TokenService) {
    this.refreshToken = this.authenticationService.getRefreshTokenFromLocalStorage();
  }

  public isRefreshTokenCurrent(refreshToken: string): boolean {
    return this.refreshToken === refreshToken;
  }

  public ngOnInit() {
    this.loadingService.show('Getting your tokens...');
    this.getTokens();
  }

  public ngOnDestroy(): void {
    this.alertService.clear();
    this.loadingService.clear();
  }

  public openModal(template: TemplateRef<any>, token?: TokenInterface) {
    this.selectedToken = token;
    this.modalReference = this.modalService.show(template, {class: 'modal-sm modal-dialog-centered'});
  }

  public deleteSingle() {
    this.loadingService.show('Deleting your token...');
    this.tokenService.delete(this.selectedToken).subscribe(
      (response) => {
        this.alertService.handleSuccess(response);
        this.loadingService.clear();
        if (this.selectedToken.refreshToken === this.refreshToken) {
          this.authenticationService.logout();
        } else {
          this.getTokens();
        }
      },
      (error) => this.alertService.handleError(error)
    );
    this.modalReference.hide();
  }

  public deleteAll() {
    this.loadingService.show('Deleting all your tokens...');
    this.tokenService.deleteAll().subscribe(
      (response) => {
        this.alertService.handleSuccess(response);
        this.loadingService.clear();
        this.authenticationService.logout();
      },
      (error) => this.alertService.handleError(error)
    );
    this.modalReference.hide();
  }

  public close() {
    this.modalReference.hide();
  }

  private getTokens() {
    this.tokenService.getTokens().subscribe(
      (response) => {
        this.tokens = response['data'];
        this.tableService.onSortColumn(this.columns[2], 'desc');
        this.tableService.setColumns(this.columns);
        this.tableService.setData(this.tokens);
        this.loadingService.clear();
      },
      (error) => this.alertService.handleError(error)
    );
  }
}

