import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';


export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  try {
    const number = phoneNumberUtil.parseAndKeepRawInput(control.value, 'US');
    console.log(phoneNumberUtil.isValidNumber(number))
    if (!phoneNumberUtil.isValidNumber(number)) {
      return { 'phone': true }; // TODO how do we store/return the parsed number??
    }
  } 
  catch (e) { }
return null;
};
