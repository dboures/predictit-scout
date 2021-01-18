import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewValue = '44';
  constructor(private router: Router, private AlertService: AlertService) { }

  ngOnInit() {
  }

  //TODO: load this persons alerts from the database here

  loadAlerts() {
    this.AlertService.loadAlerts().subscribe(
      data => {
        console.log(data)
        this.viewValue = data
      },
      error => {
        console.log(error);
      }
    );
  }

}
