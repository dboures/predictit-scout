import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class ResetPasswordComponent {
  twitterHandle: string | null = null;
  showSendLink: boolean = true;

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {}

  passwordChangeForm = new FormGroup({
    changekey: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
  });

  get changekey(): AbstractControl {
    return this.passwordChangeForm.get('changekey')!;
  }

  get password(): AbstractControl {
    return this.passwordChangeForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.passwordChangeForm.get('repeatPassword')!;
  }

  sendResetLink(): void {
    this.authService.sendResetKey(this.twitterHandle!).subscribe(
      data => {
        this.openSnackBar('Reset link sent to your Twitter direct messages', 'Ok' );
      },
      error => {
        if (error.status === 404) {
          this.openSnackBar('Twitter handle is not registered, please make sure it is correct', 'Ok' );
        } else {
          this.openSnackBar('Error sending link, please try again', 'Ok' );
        }
      });
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
        passwordMatch: true,
      }
      : null;
  }

  reset(): void {
    if (this.passwordChangeForm.invalid) {
      return;
    }

    const { changekey, password, repeatPassword } = this.passwordChangeForm.getRawValue();

    this.authService.reset(changekey, password, repeatPassword).subscribe(data => {
      if(data.n){
        this.snackBar.open('Password successfully reset', 'Ok', {
          duration: 5000,
          verticalPosition: 'top'
        });
      } else {
        this.openSnackBar('Error setting new password, please try again', 'Ok' );
      }
    },
    error => {
      this.openSnackBar('Error setting new password, please try again', 'Ok' );
    });
  }


  openSnackBar(message: string, action: string ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
   });
  }

  switch() {
    this.showSendLink = !this.showSendLink;
  }

}
