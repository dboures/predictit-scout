import { AbstractControl } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';


export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  try {
    const number = phoneNumberUtil.parseAndKeepRawInput(control.value, 'US');
    console.log(phoneNumberUtil.isValidNumber(number))
    if (!phoneNumberUtil.isValidNumber(number)) {
      return { 'phone': true };
    }
  }
  catch (e) { }
  return null;
};
