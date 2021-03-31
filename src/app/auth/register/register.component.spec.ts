import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RegisterComponent } from './register.component';
import { AuthService } from '@app/shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { throwError } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
      declarations: [RegisterComponent],
      providers: [AuthService, MatSnackBar, Overlay],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject empty forms', () => {
    const form = component.userForm;
    expect(form.valid).toBeFalsy();
  });

  it('should reject forms with unmatched passwords', () => {
    const form = component.userForm;
    const handle = form.controls.twitterHandle;
    const password = form.controls.password;
    const repeatPassword = form.controls.repeatPassword;

    handle.setValue('twitter_user');
    password.setValue('pass');
    repeatPassword.setValue('not_pass');

    expect(form.valid).toBeFalsy();
  });
  
  it('should accept complete and correct forms', () => {
    const form = component.userForm;
    const handle = form.controls.twitterHandle;
    const password = form.controls.password;
    const repeatPassword = form.controls.repeatPassword;

    handle.setValue('twitter_user');
    password.setValue('pass');
    repeatPassword.setValue('pass');

    expect(form.valid).toBeTruthy();
  });

  it('will not call authservice if an incorrect form is registered', () => {
    spyOn(authService, 'register').and.stub();
    const form = component.userForm;
    const handle = form.controls.twitterHandle;
    const password = form.controls.password;
    const repeatPassword = form.controls.repeatPassword;

    handle.setValue('twitter_user_longer_than_possible_handle');
    password.setValue('pass');
    repeatPassword.setValue('pass');

    component.register()

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('will open snackbar alert if user is already registered', () => {
    spyOn(authService, 'register').and.returnValue(throwError({ status: 500 }));
    spyOn(snackBar, 'open').and.stub();
    const form = component.userForm;
    const handle = form.controls.twitterHandle;
    const password = form.controls.password;
    const repeatPassword = form.controls.repeatPassword;

    handle.setValue('twitter_user');
    password.setValue('pass');
    repeatPassword.setValue('pass');

    component.register()

    expect(snackBar.open).toHaveBeenCalledWith('Twitter username is already registered', 'Ok', {duration:5000, verticalPosition: 'top'} );
  });

});
