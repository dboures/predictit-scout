import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
import { AlertService } from '@app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewValue = '44';
  alerts: Alert[] = [];
  constructor(private router: Router, private AlertService: AlertService) { }

  ngOnInit() {
    this.loadAlerts()
  }

  loadAlerts() {
    this.AlertService.loadAlerts().subscribe(
      data => {
        console.log(data)
        this.alerts = data
      },
      error => {
        console.log(error);
      }
    );
  }

  saveAlerts() {
    this.AlertService.saveAlerts(this.alerts).subscribe(
      data => {
        console.log(data)
        this.alerts = data
      },
      error => {
        console.log(error);
      }
    );
  }

  addDummyAlert() {
    const sampleContract: Contract = {
      id: 1234,
      name: 'dummy contract',
      shortName: 'dc',
      watchField: 'BestBuyPrice',
      isOpen: true,
    };

    const sampleAlert: Alert = {
      contract: sampleContract,
      operator: '>',
      limit: 50,
      constant: true
    };

    this.alerts.push(sampleAlert);
  }

}
