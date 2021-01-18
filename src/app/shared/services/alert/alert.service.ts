import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>('/api/alerts')
  }

  saveAlerts(userAlerts: Alert[]): Observable<Alert[]> {
    return this.http.post<Alert[]>('/api/alerts', userAlerts)
  }
}
