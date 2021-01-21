import { FormControl, Validators } from '@angular/forms';
import { phoneValidator } from '@app/shared/phone/phone.validator';

describe('phoneValidator', () => {
    var control: FormControl;

    it('should reject form if no input', () => {
        control = new FormControl('', [Validators.required, phoneValidator('+1')]);
        expect(control.valid).toBeFalsy();
    });

    it('should reject form if phone number is poorly formed', () => {
        control = new FormControl('12345', [Validators.required, phoneValidator('+1')]);
        expect(control.valid).toBeFalsy();
    });

    it('should accept form if phone number is well formed and in US', () => {
        control = new FormControl('3126984237', [Validators.required, phoneValidator('+1')]); // cannot just be random numbers, must have legit area code
        expect(control.valid).toBeTruthy();
    });

    it('should accept form if phone number is international', () => {
        control = new FormControl('030 901820', [Validators.required, phoneValidator('+49')]);
        expect(control.valid).toBeTruthy();

        control.setValue('06339 98 62 65 ');
        expect(control.valid).toBeTruthy();

        control.setValue('711 901820');
        expect(control.valid).toBeTruthy();
    });
});