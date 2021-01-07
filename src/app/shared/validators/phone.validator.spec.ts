import { TestBed, inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    control.setValue('123-456-7890');
    expect(control.valid).toBeTruthy();
    });
});