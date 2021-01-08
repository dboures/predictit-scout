import { FormControl, Validators } from '@angular/forms';
import { phoneValidator } from '@app/shared/phone/phone.validator';

describe('phoneValidator', () => {
    let control = new FormControl('', [Validators.required, phoneValidator('+1')]);

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

    it('should accept form if phone number is international', () => {
        control = new FormControl('', [Validators.required, phoneValidator('+49')]);
        control.setValue('030 901820'); 
        expect(control.valid).toBeTruthy();

        // control.setValue('004930901820'); 
        // expect(control.valid).toBeTruthy();

        control.setValue('711 901820'); 
        expect(control.valid).toBeTruthy();
    });
});