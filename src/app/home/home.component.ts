import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { marketIdValidator } from '@app/shared/marketId/marketId.validator';
import { InfoModalComponent } from '@app/shared/modals/info-modal/info-modal.component';
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
  marketErrorMessage: any = { show: false, marketId: 0 };
  market: Market | undefined;
  indicators: String[] =
    ['LastTradePrice',
      'BestBuyYesCost',
      'BestBuyNoCost',
      'BestSellYesCost',
      'BestSellNoCost',
      'LastClosePrice'];

  operators: String[] = ['>', '=', '<'];

  constructor(private router: Router, private alertService: AlertService, private marketService: MarketService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadAlerts()
  }

  newAlertForm = new FormGroup({
    marketId: new FormControl('', [Validators.required, marketIdValidator()]),
    contractName: new FormControl('', [Validators.required]),
    indicator: new FormControl('', [Validators.required]),
    operator: new FormControl('', [Validators.required]),
    limit: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]),
    // constant
  });

  get marketId(): AbstractControl {
    return this.newAlertForm.get('marketId')!;
  }

  get contractName(): AbstractControl {
    return this.newAlertForm.get('contractName')!;
  }

  get indicator(): AbstractControl {
    return this.newAlertForm.get('indicator')!;
  }

  get operator(): AbstractControl {
    return this.newAlertForm.get('operator')!;
  }

  get limit(): AbstractControl {
    return this.newAlertForm.get('limit')!;
  }

  loadAlerts() {
    this.alertService.loadAlerts().subscribe(
      data => {
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
        this.alerts = data
      },
      error => {
        console.log(error);
      }
    );
  }

  createAlert() {
    if (this.newAlertForm.get('marketId')?.invalid) {
      return
    }
    let marketId = +this.newAlertForm.get('marketId')?.value;
    this.marketService.getMarket(marketId).subscribe(
      data => {
        if (data.isOpen) {
          this.market = data;
          this.showAlertCreation = true;
          this.closeMarketErrorMessage();
        } else {
          this.marketErrorMessage.show = true;
          this.marketErrorMessage.marketId = marketId;
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

  addNewAlert(newAlert: Alert) {
    newAlert.marketName = this.market?.name ? this.market.name : '';
    if (!this.alerts.some(a => this.alertsAreSame(a,newAlert))) {
      this.alerts.push(newAlert);
    } 
  }

  alertsAreSame(alert: Alert, newAlert: Alert) {
    let isSame = alert.marketName === newAlert.marketName 
              && alert.contractName == newAlert.contractName 
              && alert.indicator === newAlert.indicator 
              && alert.operator === newAlert.operator 
              && alert.limit === newAlert.limit;

    return isSame
  }


  removeTemporaryAlert() {

    this.newAlertForm.reset();
    this.showAlertCreation = false;
  }

  closeMarketErrorMessage() {
    this.marketErrorMessage.show = false;
    this.marketErrorMessage.marketId = 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {}
    );
  }

}
