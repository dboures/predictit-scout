import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
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
    contract: sampleContract,
    operator: '>',
    limit: 50,
    constant: true
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

  it('will not call marketService if a poorly formed id is used', () => {
    spyOn(marketService, 'getMarket').and.stub();
    const form = component.newAlertForm;
    const marketIdInput = form.controls.marketId;
    marketIdInput.setValue(123);

    component.createAlert();
    expect(marketService.getMarket).not.toHaveBeenCalled();
  });
});
