import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { AuthService } from '@app/shared/services';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [LoginComponent],
        providers: [AuthService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty email and password to start', () => {
    const email = component.email;
    expect(email).toBeFalsy();

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

  it('should alert user when login fails', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 400 }));
    const showLoginError = component.showLoginError;
    expect(showLoginError).toBeFalsy();

    component.login();

    const updatedLoginError = component.showLoginError;
    expect(authService.login).toHaveBeenCalled();
    expect(updatedLoginError).toBeTruthy();
  });
});
