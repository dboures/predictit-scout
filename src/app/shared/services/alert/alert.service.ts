import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadAlerts(): Observable<string> {
    return this.http.get<string>('/api/alerts') // TODO: I guess this needs to be json? Maybe I should just make the object
  }
}
