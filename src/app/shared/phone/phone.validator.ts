import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';


// export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   const phoneNumberUtil = PhoneNumberUtil.getInstance();
//   try {
//     const number = phoneNumberUtil.parseAndKeepRawInput(control.value, 'US');
//     console.log(phoneNumberUtil.isValidNumber(number))
//     if (!phoneNumberUtil.isValidNumber(number)) {
//       return { 'phone': true };
//     }
//   }
//   catch (e) { }
//   return null;
// };

export function phoneValidator(countryCode: string): ValidatorFn {
  const phoneValidationError = { 'phone': true }
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const phoneValidationError = { 'phone': true };
    try {
      let rawNumber = countryCode.concat(control.value);
      let parsedNumber = phoneNumberUtil.parse(rawNumber);
      let isValidNumber = phoneNumberUtil.isValidNumber(parsedNumber);
      return isValidNumber ?  null: phoneValidationError;
    } catch (ex) {
        return phoneValidationError;
    }
    
  };
}


