import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {MyPasswordComponent} from './password.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {RouterTestingModule} from '@angular/router/testing';
import {jwtOptionsFactory} from '../../../core/config/app.modules';
import {AlertService} from '../../../utilities/alert/alert.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {LoadingService} from '../../../utilities/loading/loading.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('PasswordComponent', () => {

  let fixture: ComponentFixture<MyPasswordComponent>;

  let saveButton: DebugElement;
  let resetButton: DebugElement;
  let cancelButton: DebugElement;

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

    fixture = TestBed.createComponent(MyPasswordComponent);

    saveButton = fixture.debugElement.query(By.css('.btn-primary'));
    resetButton = fixture.debugElement.query(By.css('.btn-danger'));
    cancelButton = fixture.debugElement.query(By.css('.btn-warning'));

  }));
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a title of "Password"', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Password');
  }));

  it('should have 3 inputs', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('input').length).toEqual(3);
  }));

  it('should have 3 buttons', async(() => {
    fixture.detectChanges();
    expect(saveButton.nativeElement.textContent.trim()).toEqual('Save');
    expect(resetButton.nativeElement.textContent.trim()).toEqual('Reset');
    expect(cancelButton.nativeElement.textContent.trim()).toEqual('Cancel');
  }));

  it('should fail when missing fields', async(() => {
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    const form = component.passwordForm;
    const currentPasswordControl = form.controls['currentPassword'];
    const passwordControl = form.controls['password'];
    const confirmPasswordControl = form.controls['confirmPassword'];
    expect(form.valid).toBeFalsy();
    expect(currentPasswordControl.errors['required']).toBeTruthy();
    expect(passwordControl.errors['required']).toBeTruthy();
    expect(confirmPasswordControl.errors['required']).toBeTruthy();
  }));

  it('should fail when passwords do not match', async(() => {
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    const form = component.passwordForm;
    const passwordControl = form.controls['password'];
    const confirmPasswordControl = form.controls['confirmPassword'];
    passwordControl.setValue('Password');
    confirmPasswordControl.setValue('DifferentPassword');
    expect(form.valid).toBeFalsy();
    expect(confirmPasswordControl.errors['matchPassword']).toBeTruthy();
  }));

  it('should be valid when correct values are set', async(() => {
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    const form = component.passwordForm;
    const currentPasswordControl = form.controls['currentPassword'];
    const passwordControl = form.controls['password'];
    const confirmPasswordControl = form.controls['confirmPassword'];
    currentPasswordControl.setValue('Password');
    passwordControl.setValue('NewPassword');
    confirmPasswordControl.setValue('NewPassword');
    expect(form.valid).toBeTruthy();
    component.onSubmit(form);
    expect(component.passwords.currentPassword).toBe('Password');
    expect(component.passwords.password).toBe('NewPassword');
    expect(component.passwords.confirmPassword).toBe('NewPassword');
  }));

  it('should clear form values when reset button is pressed', async(() => {
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    const form = component.passwordForm;
    const currentPasswordControl = form.controls['currentPassword'];
    const passwordControl = form.controls['password'];
    const confirmPasswordControl = form.controls['confirmPassword'];
    currentPasswordControl.setValue('Password');
    passwordControl.setValue('NewPassword');
    confirmPasswordControl.setValue('NewPassword');
    expect(form.valid).toBeTruthy();
    resetButton.triggerEventHandler('click', null);
    expect(currentPasswordControl.value).toEqual(null);
    expect(passwordControl.value).toEqual(null);
    expect(confirmPasswordControl.value).toEqual(null);
  }));
});
