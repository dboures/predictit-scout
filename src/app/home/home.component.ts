import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { marketIdValidator } from '@app/shared/marketId/marketId.validator';
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
  market: Market | undefined;
  indicators: String[] =
    ['LastTradePrice',
      'BestBuyYesCost',
      'BestBuyNoCost',
      'BestSellYesCost',
      'BestSellNoCost',
      'LastClosePrice'];

  operators: String[] = ['>', '=', '<'];

  constructor(private router: Router, private alertService: AlertService, private marketService: MarketService) { }

  ngOnInit() {
    this.loadAlerts()
  }

  newAlertForm = new FormGroup({
    marketId: new FormControl('', [Validators.required, Validators.minLength(4), marketIdValidator()]),
    contractName: new FormControl('', [Validators.required]),
    indicator: new FormControl('', [Validators.required]),
    operator: new FormControl('', [Validators.required]),
    limit: new FormControl('', [Validators.required]),
    // constant
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

  createAlert() {
    if (this.newAlertForm.get('marketId')?.invalid) {
      console.log('invalid marketID'); // TODO: turn into an error message
      return
    }
    console.log('valid')
    let marketId = +this.newAlertForm.get('marketId')?.value;
    this.marketService.getMarket(marketId).subscribe(
      data => {
        console.log(data)
        if (data.isOpen){
          this.market = data;
          this.showAlertCreation = true;
        } else {
          console.log('market is closed or does not exist')
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  removeAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }

  addNewAlert(newAlert: Alert) { // gray this out until alert is valid

    if (this.newAlertForm.invalid) {
      console.log('invalid newAlert Form');
      console.log(this.newAlertForm);
      return;
    }
    newAlert.marketName = this.market?.name ? this.market.name: '';
    console.log(newAlert);

    if (!this.alerts.some(a => a === newAlert)) {
      this.alerts.push(newAlert);
    } else [
      console.log('already exists in alerts')
    ]
  }

  removeTemporaryAlert() {

    this.newAlertForm.reset();
    this.showAlertCreation = false;
  }

}
