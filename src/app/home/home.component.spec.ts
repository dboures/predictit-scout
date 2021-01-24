import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    constant: true
  };

  const sampleMarket: Market = {
    id: 1234,
    name: 'dummy market',
    shortName: 'dm',
    contracts: [sampleContract],
    isOpen: true
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
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

  // it('createAlert will open closed market popup if market is closed, or could not find', () => {
  //  TODO:
  // });


});
