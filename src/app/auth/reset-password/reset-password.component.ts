import { Component, OnInit } from '@angular/core';
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
  password: string | null = null;

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {}

  sendResetLink(): void {
    this.authService.sendResetLink(this.twitterHandle!).subscribe(
      data => {
        console.log(data);
        this.openSnackBar('Reset link sent to your Twitter direct messages', 'Ok' );
      },
      error => {
        this.openSnackBar('Could not find Twitter handle, please try again', 'Ok' );
      });
  }

  openSnackBar(message: string, action: string ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
   });
  }

}
