import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { repeat, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private _zone: NgZone, private authService: AuthService) { }

  loadAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>('/api/alerts')
  }

  saveAlerts(userAlerts: Alert[]): Observable<Alert[]> {
    return this.http.put<Alert[]>('/api/alerts', userAlerts)
  }

  longPollAlerts(): Observable<any> {
      return this.http.get<any>('/api/alerts/updates')
      .pipe(
      retry(),
      repeat(),
    );
  };

}
