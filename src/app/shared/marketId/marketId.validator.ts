import { AbstractControl, ValidatorFn } from '@angular/forms';

export function marketIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const marketIdValidationError = { 'marketId': true };
        let isNum = /^\d+$/.test(control.value);
        return isNum && (control.value.length > 3) ? null : marketIdValidationError;
    };
}