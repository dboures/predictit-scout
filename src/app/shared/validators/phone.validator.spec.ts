import { FormControl, Validators } from '@angular/forms';
import { phoneValidator } from '@app/shared/validators/phone.validator';

describe('phoneValidator', () => {
    const control = new FormControl('', [Validators.required, phoneValidator]);

    it('should reject form if no input', () => {
        expect(control.valid).toBeFalsy();
    });

    it('should reject form if phone number is poorly formed', () => {
        control.setValue('12345');
        expect(control.valid).toBeFalsy();
    });

    it('should accept form if phone number is well formed and in US', () => {
        control.setValue('3126984237'); // cannot just be random numbers, must have legit area code
        expect(control.valid).toBeTruthy();
    });

    it('should reject form if phone number is international', () => {
        control.setValue('49 30 901820'); 
        expect(control.valid).toBeFalsy();

        control.setValue('004930901820'); 
        expect(control.valid).toBeFalsy();

        control.setValue('+49 152 901820'); 
        expect(control.valid).toBeFalsy();
    });
});