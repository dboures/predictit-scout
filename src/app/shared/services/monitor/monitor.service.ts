import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  monitor(): Observable<string> {
    return this.http.get<string>('/api/monitor') // TODO: I guess this needs to be json? Maybe I should just make the object
  }
}
