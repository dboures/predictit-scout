import { FormControl, Validators } from '@angular/forms';
import { phoneValidator } from '@app/shared/validators/phone.validator';

describe('phoneValidator', () => {
    const control = new FormControl('', [Validators.required, phoneValidator]);

    it('should invalidate form if no input', () => {
        expect(control.valid).toBeFalsy();
    });

    it('should invalidate form if phone is bad', () => {
        control.setValue('12345');
        expect(control.valid).toBeFalsy();
    });

    it('should accept form if phone is good', () => {
        control.setValue('3126984237'); // cannot just be random numbers, must have legit area code
        expect(control.valid).toBeTruthy();
    });
});