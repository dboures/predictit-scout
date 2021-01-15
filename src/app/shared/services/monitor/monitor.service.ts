import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http: HttpClient) { }

  monitor (): Observable<number> {
    return this.http.get<number>('/api/monitor')
  }
}
