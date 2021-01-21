import { FormControl, Validators } from '@angular/forms';
import { marketIdValidator } from '@app/shared/marketId/marketId.validator';

describe('marketIdValidator', () => {
    var control: FormControl;

    it('should reject form if no input', () => {
        control = new FormControl('', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeFalsy();
    });

    it('should reject form if input has space', () => {
        control = new FormControl('123 5', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeFalsy();
    });

    it('should reject form if input has decimal', () => {
        control = new FormControl('123.5', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeFalsy();
    });

    it('should reject form if input has letters', () => {
        control = new FormControl('123a5', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeFalsy();
    });

    it('should accept form if input is all numbers', () => {
        control = new FormControl('12345', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeTruthy();
    });

    it('should accept form if input length < 2', () => { // Notable because the builtin length validator is used for the actual form
        control = new FormControl('1', [Validators.required, marketIdValidator()]);
        expect(control.valid).toBeTruthy();
    });
});