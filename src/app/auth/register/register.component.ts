import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) { }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
        passwordMatch: true,
      }
      : null;
  }

  userForm = new FormGroup({
    twitterHandle: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
  });

  get twitterHandle(): AbstractControl {
    return this.userForm.get('twitterHandle')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { twitterHandle, password, repeatPassword } = this.userForm.getRawValue();

    this.authService.register(twitterHandle, password, repeatPassword).subscribe(data => {
      this.router.navigate(['']);
    },
    error => {
      if (error.status === 500){
        this.snackBar.open('Twitter username is already registered', 'Ok', {
          duration: 5000,
          verticalPosition: 'top'
       });
      }
    });
  }
}
