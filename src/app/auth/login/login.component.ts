import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {}

  login(): void {
    this.authService.login(this.email!, this.password!).subscribe(
      data => {
        this.router.navigateByUrl('/');
      },
      error => {
        this.openSnackBar('Error logging in, please check your email/password and try again', 'Ok' );
      });
  }

  openSnackBar(message: string, action: string ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
   });
  }
}
