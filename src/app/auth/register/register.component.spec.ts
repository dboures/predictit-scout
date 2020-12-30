import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject empty forms', () => {
    const form = component.userForm;
    expect(form.valid).toBeFalsy();
  });

  it('should reject forms with incorrect email', () => {
    const form = component.userForm;

    const nameInput = form.controls.fullname;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;
    const repeatPasswordInput = form.controls.repeatPassword;

    nameInput.setValue('John Peter');
    emailInput.setValue('jpeteratgmail.com');
    passwordInput.setValue('verysecret');
    repeatPasswordInput.setValue('verysecret');

    expect(form.valid).toBeFalsy();
  });

  it('should accept complete + correct forms', () => {
    const form = component.userForm;

    const nameInput = form.controls.fullname;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;
    const repeatPasswordInput = form.controls.repeatPassword;

    nameInput.setValue('John Peter');
    emailInput.setValue('jpeter@gmail.com');
    passwordInput.setValue('verysecret');
    repeatPasswordInput.setValue('verysecret');
    
    expect(form.valid).toBeTruthy();
  });

});
