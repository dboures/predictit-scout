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
    const phoneInput = form.controls.phone;
    const passwordInput = form.controls.password;
    const repeatPasswordInput = form.controls.repeatPassword;

    nameInput.setValue('John Peter');
    emailInput.setValue('jpeteratgmail.com');
    phoneInput.setValue('2125075591');
    passwordInput.setValue('verysecret');
    repeatPasswordInput.setValue('verysecret');

    expect(form.valid).toBeFalsy();
  });

  it('should reject forms with incorrect phone number', () => {
    const form = component.userForm;

    const nameInput = form.controls.fullname;
    const emailInput = form.controls.email;
    const phoneInput = form.controls.phone;
    const passwordInput = form.controls.password;
    const repeatPasswordInput = form.controls.repeatPassword;

    nameInput.setValue('John Peter');
    emailInput.setValue('jpeter@gmail.com');
    phoneInput.setValue('212-5k7-5591');
    passwordInput.setValue('verysecret');
    repeatPasswordInput.setValue('verysecret');

    expect(form.valid).toBeFalsy();
  });

  it('should accept complete and correct forms', () => {
    const form = component.userForm;

    const nameInput = form.controls.fullname;
    const emailInput = form.controls.email;
    const phoneInput = form.controls.phone;
    const passwordInput = form.controls.password;
    const repeatPasswordInput = form.controls.repeatPassword;

    nameInput.setValue('John Peter');
    emailInput.setValue('jpeter@gmail.com');
    phoneInput.setValue('212-507-5591');
    passwordInput.setValue('verysecret');
    repeatPasswordInput.setValue('verysecret');
    
    expect(form.valid).toBeTruthy();
  });

});
