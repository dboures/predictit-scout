import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfoModalComponent } from './other/info-modal/info-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MessagesModalComponent } from './other/messages-modal/messages-modal.component';
import { AboutModalComponent } from './other/about-modal/about-modal.component';

@NgModule({
  imports: [RouterModule, MatDialogModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  declarations: [InfoModalComponent, NotFoundComponent, MessagesModalComponent, AboutModalComponent],
})
export class SharedModule {}
