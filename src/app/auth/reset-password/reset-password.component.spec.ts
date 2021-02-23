import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/shared/services';
import { of, throwError } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ ResetPasswordComponent ],
      providers: [AuthService, MatSnackBar, Overlay],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;

    authService = TestBed.get(AuthService);
    snackBar = TestBed.get(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert user with specific message when 404 returned', () => {
    spyOn(authService, 'sendResetKey').and.returnValue(throwError({ status: 404 }));
    spyOn(snackBar, 'open').and.stub();
    
    component.sendResetLink();

    expect(snackBar.open).toHaveBeenCalledWith('Twitter handle is not registered, please make sure it is correct','Ok', {duration:5000, verticalPosition: 'top'} );
  });

  it('should alert user with other message when error is not 404', () => {
    spyOn(authService, 'sendResetKey').and.returnValue(throwError({ status: 500 }));
    spyOn(snackBar, 'open').and.stub();
    
    component.sendResetLink();

    expect(snackBar.open).toHaveBeenCalledWith('Error sending link, please try again', 'Ok', {duration:5000, verticalPosition: 'top'} );
  });

  it('should call the authservice to send key link', () => {
    spyOn(authService, 'sendResetKey').and.returnValue(of(true));
    
    component.sendResetLink();

    expect(authService.sendResetKey).toHaveBeenCalled();
  });

  it('should call the authservice to reset password', () => {
    spyOn(authService, 'reset').and.returnValue(of(true));
    const form = component.passwordChangeForm;
    const changekey = form.controls.changekey;
    const password = form.controls.password;
    const repeatPassword = form.controls.repeatPassword;

    changekey.setValue('abcd-1234');
    password.setValue('pass');
    repeatPassword.setValue('pass');
    
    component.reset();

    expect(authService.reset).toHaveBeenCalled();
  });

  it('should reject empty forms', () => {
    const form = component.passwordChangeForm;
    expect(form.valid).toBeFalsy();
  });

});
