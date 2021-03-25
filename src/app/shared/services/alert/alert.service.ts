import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Alert } from '@app/shared/interfaces/alert.interface';
import { Observable } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source'
import { AuthService } from '../auth/auth.service';

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

  getServerModifiedAlerts(): Observable<Alert[]> {
    return Observable.create((observer: { 
        next: (arg0: MessageEvent<any>) => void; 
        error: (arg0: Event) => void; 
        }) => {
          const eventSource = this.getEventSource('/api/alerts/updates');
          eventSource.onopen = (event: any) => {
            this._zone.run(() => {
            });
          };

          eventSource.onmessage = event => {
            this._zone.run(() => {
              observer.next(JSON.parse(event.data).data);
            });
          };
          eventSource.onerror = (error: Event) => {
            this._zone.run(() => {
              observer.error(error);
            });
          };
        });
  }
  private getEventSource(url: string): EventSourcePolyfill {
    let authHeaders = this.authService.getAuthorizationHeaders();
    return new EventSourcePolyfill(url, {headers: authHeaders});
  }
}
