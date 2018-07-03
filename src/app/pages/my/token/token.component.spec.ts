import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {RouterTestingModule} from '@angular/router/testing';
import {jwtOptionsFactory} from '../../../core/config/app.modules';
import {AlertService} from '../../../utilities/alert/alert.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {MyTokenComponent} from './token.component';
import {TableService} from '../../../utilities/table/table.service';
import {TableModule} from '../../../utilities/table/table.module';
import {OperatingSystemPipe} from '../../../pipes/operating-system-pipe';
import {BrowserPipe} from '../../../pipes/browser-pipe';
import {BsDropdownModule, BsModalService} from 'ngx-bootstrap';

describe('TokenComponent', () => {

  let fixture: ComponentFixture<MyTokenComponent>;

  const tokens = [
    {
      id: 1,
      refreshToken: '1',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Windows',
      browser: 'IE',
    },
    {
      id: 2,
      refreshToken: '2',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Windows',
      browser: 'Edge',
    },
    {
      id: 3,
      refreshToken: '3',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Apple',
      browser: 'Safari',
    },
    {
      id: 4,
      refreshToken: '4',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Linux',
      browser: 'Chrome',
    },
    {
      id: 5,
      refreshToken: '5',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Linux',
      browser: 'Firefox',
    },
    {
      id: 6,
      refreshToken: '6',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Android',
      browser: 'Opera',
    },
    {
      id: 7,
      refreshToken: '7',
      username: 'admin',
      valid: new Date().toString(),
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      operatingSystem: 'Other',
      browser: 'Other',
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule.forRoot(),
        CommonModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory
          }
        }),
        ReactiveFormsModule,
        RouterTestingModule,
        TableModule
      ],
      declarations: [
        MyTokenComponent,
        OperatingSystemPipe,
        BrowserPipe
      ],
      providers: [
        AlertService,
        AuthenticationService,
        BsModalService,
        LoadingService,
        TableService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTokenComponent);
  }));
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a title of "Token"', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Token');
  }));

  const numberOfButtons = tokens.length + 1;
  it('should have ' + numberOfButtons + ' delete buttons.', async(() => {
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.tokens = tokens;
    component.tableService.onSortColumn(component.columns[2], 'desc');
    component.tableService.setColumns(component.columns);
    component.tableService.setData(component.tokens);
    component.loadingService.clear();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.btn-danger').length).toEqual(numberOfButtons);
  }));
});
