import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

export function phoneValidator(countryCode: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const phoneValidationError = { 'phone': true };
    try {
      let rawNumber = countryCode.concat(control.value);
      let parsedNumber = phoneNumberUtil.parse(rawNumber);
      let isValidNumber = phoneNumberUtil.isValidNumber(parsedNumber);
      return isValidNumber ? null : phoneValidationError;
    } catch (ex) {
      return phoneValidationError;
    }

  };
}


