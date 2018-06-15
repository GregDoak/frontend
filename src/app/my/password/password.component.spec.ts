import {TestBed, async} from '@angular/core/testing';
import {MyPasswordComponent} from './password.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertService} from '../../utility/alert/alert.service';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {jwtOptionsFactory} from '../../core/config/app.modules';
import {LoadingService} from '../../utility/loading/loading.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('PasswordComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        RouterTestingModule
      ],
      declarations: [
        MyPasswordComponent
      ],
      providers: [
        AlertService,
        AuthenticationService,
        LoadingService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a title of "Password"', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Password');
  }));

  it('should have 3 inputs', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('input').length).toEqual(3);
  }));

  it('should have a save button', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-primary').textContent.trim()).toEqual('Save');
  }));

  it('should have a reset button', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-danger').textContent.trim()).toEqual('Reset');
  }));

  it('should have a cancel button', async(() => {
    const fixture = TestBed.createComponent(MyPasswordComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-warning').textContent.trim()).toEqual('Cancel');
  }));
});
