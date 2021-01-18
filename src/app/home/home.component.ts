import { Component, OnInit } from '@angular/core';
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
  // market: Market = ;
  constructor(private router: Router, private alertService: AlertService, private marketService: MarketService) { }

  ngOnInit() {
    this.loadAlerts()
  }

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
        //this.market = data
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleAlertCreation() {
    this.showAlertCreation = !this.showAlertCreation;
  }

  removeTemporaryAlert() {
    //do something
    this.showAlertCreation = !this.showAlertCreation;
  }

  addDummyAlert() {
    const sampleContract: Contract = {
      id: 1234,
      name: 'dummy contract',
      shortName: 'dc',
      watchField: 'BestBuyPrice'
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
