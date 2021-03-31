import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['../modals.scss']
})
export class MessagesModalComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MessagesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.router.navigate(['']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
