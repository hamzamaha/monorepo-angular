import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Order, ResOneOrder, ResOrder } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url: string = 'http://localhost:4500/api/v1/orders';
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<ResOrder> {
    return this.http.get<ResOrder>(this.url);
  }

  updateOrders(id: string, Order: Order): Observable<ResOneOrder> {
    return this.http.patch<ResOneOrder>(`${this.url}/${id}`, Order);
  }

  addOrder(data: Order): Observable<ResOneOrder> {
    return this.http.post<ResOneOrder>(this.url, data);
  }
}
