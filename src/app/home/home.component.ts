import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { AlertService } from '@app/shared/services';
import { MarketService } from '@app/shared/services/market/market.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alerts: Alert[] = [];
  showAlertCreation: boolean = false;
  newAlert: Alert | undefined;
  market: Market | undefined;
  constructor(private router: Router, private alertService: AlertService, private marketService: MarketService) { }

  ngOnInit() {
    this.loadAlerts()
  }

  newAlertForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    contract: new FormControl('', [Validators.required]),
  });

  loadAlerts() {
    this.alertService.loadAlerts().subscribe(
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
    this.alertService.saveAlerts(this.alerts).subscribe(
      data => {
        console.log(data)
        this.alerts = data
      },
      error => {
        console.log(error);
      }
    );
  }

  getMarket() {
    this.marketService.getMarket(7054).subscribe(
      data => {
        console.log(data)
        this.market = data
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleAlertCreation() {
    this.showAlertCreation = !this.showAlertCreation;
  }

  removeTemporaryAlert() { // wtf is this
    //do something
    this.showAlertCreation = !this.showAlertCreation;
  }

  addNewAlert(newAlert: Alert) {
    // const sampleContract: Contract = {
    //   id: 1234,
    //   name: 'dummy contract',
    //   shortName: 'dc',
    //   watchField: 'BestBuyPrice'
    // };

    // const sampleAlert: Alert = {
    //   contract: sampleContract,
    //   operator: '>',
    //   limit: 50,
    //   constant: true
    // };

    if (this.newAlertForm.invalid) {
      return;
    }

    this.alerts.push(newAlert);
    this.newAlert = undefined;
  }

}
