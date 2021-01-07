import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();



export function phoneValidator(regionCode: string = "US"): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let validNumber = false;
    //   try {
    //     const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
    //       control.value, regionCode
    //     );
    //     validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    //   } catch (e) {console.log(e) }
      
      if(validNumber){
          return {'phone': true};
      }
      return null;
    }
  }
