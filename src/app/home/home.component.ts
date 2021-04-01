import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { marketIdValidator } from '@app/shared/marketId/marketId.validator';
import { InfoModalComponent } from '@app/shared/other/info-modal/info-modal.component';
import { AlertService } from '@app/shared/services';
import { MarketService } from '@app/shared/services/market/market.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  showAlertCreation: boolean = false;
  marketErrorMessage: any = { show: false, marketId: 0 };
  market: Market | undefined;
  indicators: String[] = [
    'LastTradePrice',
    'BestBuyYesCost',
    'BestBuyNoCost',
    'BestSellYesCost',
    'BestSellNoCost',
    'LastClosePrice',
  ];

  operators: String[] = ['>', '=', '<'];
  eventSource: EventSource | undefined;
  longPollSubscription: Subscription | undefined;

  constructor(
    private alertService: AlertService,
    private marketService: MarketService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAlerts();
    this.longPollSubscription = this.alertService.longPollAlerts().subscribe((data) => {
      if(data) {
        this.loadAlerts();
      }
    })
  }

  ngOnDestroy(): void {
    this.longPollSubscription?.unsubscribe();
  }

  newAlertForm = new FormGroup({
    marketId: new FormControl('', [Validators.required, marketIdValidator()]),
    contractName: new FormControl('', [Validators.required]),
    contractId: new FormControl('', [Validators.required]),
    indicator: new FormControl('', [Validators.required]),
    operator: new FormControl('', [Validators.required]),
    limit: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
  });

  get marketId(): AbstractControl {
    return this.newAlertForm.get('marketId')!;
  }

  get contractName(): AbstractControl {
    return this.newAlertForm.get('contractName')!;
  }

  get contractId(): AbstractControl {
    return this.newAlertForm.get('contractId')!;
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

  setFormContractName() {
    let contract = this.market?.contracts.find((contract) => {
      return contract.id === this.newAlertForm.get('contractId')?.value;
    });
    this.newAlertForm.patchValue({ contractName: contract?.name });
  }

  loadAlerts() {
    this.alertService.loadAlerts().subscribe(
      (data) => {
        this.alerts = data;
      },
      (error) => {
        this.openSnackBar('Issue loading alerts, please try again', 'Ok');
      }
    );
  }

  saveAlerts() {
    this.alertService.saveAlerts(this.alerts).subscribe(
      (data) => {
        this.alerts = data;
        this.openSnackBar('Alerts saved successfully', 'Ok');
      },
      (error) => {
        this.openSnackBar('Issue saving alerts, please try again', 'Ok');
      }
    );
  }

  createAlert() {
    if (this.newAlertForm.get('marketId')?.invalid) {
      return;
    }
    let marketId = this.newAlertForm.get('marketId')?.value;
    this.marketService.getMarket(marketId).subscribe(
      (data) => {
        if (data.isOpen) {
          this.market = data;
          this.showAlertCreation = true;
        } else {
          this.openSnackBar(
            'Market with id ' +
              marketId.toString() +
              ' is closed or does not exist',
            'Ok'
          );
        }
      },
      (error) => {
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
    newAlert.openMarket = true;
    newAlert.sent = false;
    newAlert.marketName = this.market?.name ? this.market.name : '';
    newAlert.marketId = +newAlert.marketId;
    newAlert.limit = +newAlert.limit;
    if (!this.alerts.some((a) => this.alertsAreSame(a, newAlert))) {
      if(this.alerts.length <  3){
        this.alerts.push(newAlert);
      }
      else {
        this.openSnackBar('Currently you can only open 3 alerts', 'Ok');  
      }
    } else {
      this.openSnackBar('Alert already exists', 'Ok');
    }
  }

  alertsAreSame(alert: Alert, newAlert: Alert) {
    let isSame =
      alert.marketName === newAlert.marketName &&
      alert.contractName == newAlert.contractName &&
      alert.contractId == newAlert.contractId &&
      alert.indicator === newAlert.indicator &&
      alert.operator === newAlert.operator &&
      alert.limit === newAlert.limit;

    return isSame;
  }

  removeTemporaryAlert() {
    this.newAlertForm.reset();
    this.showAlertCreation = false;
  }

  openHelpModal(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {panelClass: 'modal'});
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
