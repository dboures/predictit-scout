import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from '@app/shared/interfaces';
import { AboutModalComponent } from '@app/shared/other/about-modal/about-modal.component';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() user: User | null = null;

  constructor(private router: Router, private authService: AuthService, 
    public dialog: MatDialog) {}

  logout(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }

  gotoAlerts(): void {
    this.router.navigateByUrl('/');
  }

  gotoFeedback(): void {
    this.router.navigateByUrl('/feedback');
  }

  openAboutModal(): void {
    const dialogRef = this.dialog.open(AboutModalComponent, {panelClass: 'modal'});
  }

}
