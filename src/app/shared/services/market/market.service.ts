import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Market } from '@app/shared/interfaces/market.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getMarket(id: number): Observable<Market> {
    return this.http.get<Market>('/api/market')
  }
}
