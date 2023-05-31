import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Product, ResOneProduct, ResProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = 'http://localhost:4500/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ResProduct> {
    return this.http.get<ResProduct>(this.apiUrl);
  }

  // addProduct(data: Product): Observable<ResOneProduct> {
  //   return this.http.post<ResOneProduct>(this.apiUrl, data);
  // }

  addProduct(formData: FormData): Observable<ResOneProduct> {
    return this.http.post<ResOneProduct>(this.apiUrl, formData);
  }

  deleteProduct(id: string): Observable<ResOneProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ResOneProduct>(url);
  }

  updateProduct(id: string, data: FormData): Observable<ResOneProduct> {
    return this.http.patch<ResOneProduct>(`${this.apiUrl}/${id}`, data);
  }

  getProduct(id: string): Observable<ResOneProduct> {
    return this.http.get<ResOneProduct>(`${this.apiUrl}/${id}`);
  }
}
