import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Contract } from '@app/shared/interfaces/contract.interface';
import { AlertService } from '@app/shared/services';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let alertService: AlertService;

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ HomeComponent ],
      providers: [ AlertService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    alertService = TestBed.get(AlertService);
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
});
