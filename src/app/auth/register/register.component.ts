import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';
import { phoneValidator } from '@app/shared/phone/phone.validator';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import * as carrierMapJSON from '@app/shared/phone/carrierMap.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  phoneNumberUtil = PhoneNumberUtil.getInstance();
  carrierMap = carrierMapJSON;
  countryCode: string = '+1';
  carrierName: string = 'AT&T';
  constructor(private router: Router, private authService: AuthService) { }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
        passwordMatch: true,
      }
      : null;
  }

  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, phoneValidator(this.countryCode)]),
    carrier: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
  });

  get fullname(): AbstractControl {
    return this.userForm.get('fullname')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get carrier(): AbstractControl {
    return this.userForm.get('carrier')!;
  }

  get phone(): AbstractControl {
    return this.userForm.get('phone')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { fullname, email, carrier, phone, password, repeatPassword } = this.userForm.getRawValue();
    const number = this.phoneNumberUtil.parse(this.countryCode.concat(phone), "");
    const cleanPhone = this.phoneNumberUtil.format(number, PhoneNumberFormat.E164);

    this.authService.register(fullname, email, carrier, cleanPhone, password, repeatPassword).subscribe(data => {
      this.router.navigate(['']);
    });
  }
}
