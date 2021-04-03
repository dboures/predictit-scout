import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['../modals.scss']
})
export class MessagesModalComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MessagesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.router.navigateByUrl('/');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
