import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { AlertService } from '@app/shared/services';
import { MarketService } from '@app/shared/services/market/market.service';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let alertService: AlertService;
  let marketService: MarketService;

  const sampleContract: Contract = {
    id: 1234,
    name: 'dummy contract',
    shortName: 'dc',
    indicator: 'BestBuyPrice'
  };

  const sampleAlert: Alert = {
    marketName: 'this is a market',
    contractName: 'that one contract',
    indicator: 'buyprice',
    operator: '>',
    limit: 50,
    //constant: true
  };

  const sampleMarket: Market = {
    id: 1234,
    name: 'dummy market',
    shortName: 'dm',
    contracts: [sampleContract],
    isOpen: true
  };

  const closedMarket: Market = {
    id: 1000,
    name: 'dummy market',
    shortName: 'dm',
    contracts: [sampleContract],
    isOpen: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      declarations: [HomeComponent],
      providers: [AlertService, MarketService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    alertService = TestBed.get(AlertService);
    marketService = TestBed.get(MarketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadAlerts calls the alertService', () => {
    spyOn(alertService, 'loadAlerts').and.returnValue(of([sampleAlert]));
    component.loadAlerts()

    expect(alertService.loadAlerts).toHaveBeenCalled();
  });

  it('saveAlerts calls the alertService', () => {
    spyOn(alertService, 'saveAlerts').and.returnValue(of([sampleAlert]));
    component.saveAlerts()

    expect(alertService.saveAlerts).toHaveBeenCalled();
  });

  it('createAlert calls the marketService', () => {
    spyOn(marketService, 'getMarket').and.returnValue(of(sampleMarket));
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('1234');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    component.createAlert();
    expect(marketService.getMarket).toHaveBeenCalled();
  });

  it('createAlert will not call marketService if a poorly formed id is used', () => {
    spyOn(marketService, 'getMarket').and.stub();
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('123');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    component.createAlert();
    expect(marketService.getMarket).not.toHaveBeenCalled();
  });

  it('createAlert opens the alert creation div', () => {
    expect(component.showAlertCreation).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.alert-creation'))).toBeNull();

    spyOn(marketService, 'getMarket').and.returnValue(of(sampleMarket));
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('1234');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    component.createAlert();
    expect(component.showAlertCreation).toBeTruthy();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.alert-creation'))).toBeDefined();
  });

  // it('createAlert will open error popup if marketService is not called', () => {
  //  TODO:
  // });

  it('createAlert will open error snackbar if market is closed, or could not find', () => {
    spyOn(marketService, 'getMarket').and.returnValue(of(closedMarket));
    spyOn(component.snackBar, 'open');
    
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('1234');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    component.createAlert();
    fixture.detectChanges();
    expect(component.snackBar.open).toHaveBeenCalled();
  });

  it('addAlert will open error snackbar if you try to add an alert that already exists', () => {
    spyOn(component.snackBar, 'open');
    component.alerts =  [sampleAlert];
    component.addNewAlert(sampleAlert);
    fixture.detectChanges();
    expect(component.snackBar.open).toHaveBeenCalled();
  });




  it('alertsAreSame returns true for the same alerts ', () => {
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('1234');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    const other_form = component.newAlertForm;
    const other_marketIdInput = other_form.controls.marketId;
    const other_contractNameInput = other_form.controls.contractName;
    const other_indicatorInput = other_form.controls.indicator;
    const other_operatorInput = other_form.controls.operator;
    const other_limitInput = other_form.controls.limit;

    other_marketIdInput.setValue('1234');
    other_contractNameInput.setValue('cName');
    other_indicatorInput.setValue('buyprice');
    other_operatorInput.setValue('=');
    other_limitInput.setValue(45);

    let a1 = form.value;
    let a2 = other_form.value;

    expect(component.alertsAreSame(a1, a2)).toBeTrue;
  });

  it('alertsAreSame returns false for different alerts ', () => {
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractNameInput = form.controls.contractName;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('1234');
    contractNameInput.setValue('cName');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    const other_form = component.newAlertForm;
    const other_marketIdInput = other_form.controls.marketId;
    const other_contractNameInput = other_form.controls.contractName;
    const other_indicatorInput = other_form.controls.indicator;
    const other_operatorInput = other_form.controls.operator;
    const other_limitInput = other_form.controls.limit;

    other_marketIdInput.setValue('1234');
    other_contractNameInput.setValue('cName');
    other_indicatorInput.setValue('buyprice');
    other_operatorInput.setValue('=');
    other_limitInput.setValue(99);

    let a1 = form.value;
    let a2 = other_form.value;

    expect(component.alertsAreSame(a1, a2)).toBeFalse;
  });

});
