import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {}

  userForm = new FormGroup({
    twitterHandle: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required]),
  });

  get twitterHandle(): AbstractControl {
    return this.userForm.get('twitterHandle')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  login(): void {
    if (this.userForm.invalid) {
      return;
    }
    const { twitterHandle, password } = this.userForm.getRawValue();
    this.authService.login(twitterHandle, password).subscribe(
      data => {
        this.router.navigateByUrl('/');
      },
      error => {
        this.openSnackBar('Error logging in, please check your Twitter handle/password and try again', 'Ok' );
      });
  }

  openSnackBar(message: string, action: string ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
   });
  }

  goToRegister() {
    this.router.navigateByUrl('/auth/register');
  }
}
