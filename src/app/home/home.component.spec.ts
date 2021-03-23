import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
import { Market } from '@app/shared/interfaces/market.interface';
import { AlertService } from '@app/shared/services';
import { MarketService } from '@app/shared/services/market/market.service';
import { of, throwError } from 'rxjs';

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
    marketId:55,
    contractId:1234,
    openMarket:true,
    sent:false,
    marketName: 'this is a market',
    contractName: 'that one contract',
    indicator: 'buyprice',
    operator: '>',
    limit: 50
  };

  const otherSampleAlert: Alert = {
    marketId:57,
    contractId:1244,
    openMarket:true,
    sent:false,
    marketName: 'this is a market',
    contractName: 'that one contract',
    indicator: 'buyprice',
    operator: '>',
    limit: 50
  };

  const sampleMarket: Market = {
    id: 55,
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
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
      declarations: [HomeComponent],
      providers: [MatSnackBar,AlertService, MarketService]
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

  it('loadAlerts opens a snackbar if there is an error', () => {
    spyOn(alertService, 'loadAlerts').and.returnValue(throwError({ status: 500 }));
    spyOn(component.snackBar, 'open').and.stub();
    component.loadAlerts()

    expect(alertService.loadAlerts).toHaveBeenCalled();
    expect(component.snackBar.open).toHaveBeenCalledWith('Issue loading alerts, please try again','Ok', {duration:5000, verticalPosition: 'top'} );
  });

  it('saveAlerts calls the alertService', () => {
    spyOn(alertService, 'saveAlerts').and.returnValue(of([sampleAlert]));
    component.saveAlerts()

    expect(alertService.saveAlerts).toHaveBeenCalled();
  });

  it('saveAlerts opens a snackbar if there is an error', () => {
    spyOn(alertService, 'saveAlerts').and.returnValue(throwError({ status: 500 }));
    spyOn(component.snackBar, 'open').and.stub();
    component.saveAlerts()

    expect(alertService.saveAlerts).toHaveBeenCalled();
    expect(component.snackBar.open).toHaveBeenCalledWith('Issue saving alerts, please try again','Ok', {duration:5000, verticalPosition: 'top'} );
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

  it('addnewAlert will return if you try to add an alert that already exists', () => {
    component.alerts =  [sampleAlert];
    const old_len = component.alerts.length;
    component.addNewAlert(sampleAlert);
    fixture.detectChanges();

    expect(old_len).toEqual(component.alerts.length);
  });

  it('addnewAlert will add new alerts', () => {
    const newAlert: Alert = {
      marketId:13,
      contractId:7896,
      openMarket:true,
      sent:false,
      marketName: 'this is a different market',
      contractName: 'and a diff contract',
      indicator: 'buyprice',
      operator: '=',
      limit: 42
    };
 
    component.alerts =  [sampleAlert];
    const old_len = component.alerts.length;
    component.addNewAlert(newAlert);
    fixture.detectChanges();

    expect(old_len).toBeLessThan(component.alerts.length);
    expect(component.alerts.length).toBe(2);
  });

  it('addnewAlert will only allow 3 to be saved', () => {
    spyOn(component.snackBar, 'open').and.stub();
    component.alerts =  [sampleAlert, sampleAlert, sampleAlert];
    const old_len = component.alerts.length;
    component.addNewAlert(otherSampleAlert);
    fixture.detectChanges();

    expect(old_len).toEqual(component.alerts.length);
    expect(component.snackBar.open).toHaveBeenCalledWith('Currently you can only open 3 alerts', 'Ok', {duration:5000, verticalPosition: 'top'} );
  });

  it('removeAlert will remove an alert', () => {
    component.alerts =  [sampleAlert];
    const old_len = component.alerts.length;
    component.removeAlert(sampleAlert);
    fixture.detectChanges();

    expect(old_len).toBeGreaterThan(component.alerts.length);
    expect(component.alerts.length).toBe(0);
  });

  it('addnewAlert will open error snackbar if you try to add an alert that already exists', () => {
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

  it('setFormContractName sets the forms contract name', () => {
    component.market = sampleMarket;

    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    const contractIdInput = form.controls.contractId;
    const indicatorInput = form.controls.indicator;
    const operatorInput = form.controls.operator;
    const limitInput = form.controls.limit;

    marketIdInput.setValue('55');
    contractIdInput.setValue('1234');
    indicatorInput.setValue('buyprice');
    operatorInput.setValue('=');
    limitInput.setValue(45);

    spyOn(form, 'patchValue');

    expect(form.get('contractName')?.value).toBe('');
    expect(form.get('contractId')?.value).toBe('1234')

    component.setFormContractName();
    
    expect(form.patchValue).toHaveBeenCalled();
  });

});
