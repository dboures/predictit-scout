import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { throwError } from 'rxjs';
import { AuthService } from '@app/shared/services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Overlay } from '@angular/cdk/overlay';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
        declarations: [LoginComponent],
        providers: [AuthService, MatSnackBar, Overlay],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.get(AuthService);
    snackBar = TestBed.get(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty handle and password to start', () => {
    const handle = component.twitterHandle;
    expect(handle).toBeFalsy();

    const password = component.password;
    expect(password).toBeFalsy();
  });

  // it('should reject malformed email and passwords', () => {
  // });

  it('should call authservice login when component login is called', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 400 }));

    component.login();

    expect(authService.login).toHaveBeenCalled();
  });

  it('should alert user by opening snackbar when login fails', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 400 }));
    spyOn(snackBar, 'open').and.stub();
    
    component.login();

    expect(snackBar.open).toHaveBeenCalled();
  });
});
