import { Category, ResCategory, ResOneCategory } from './../models/category';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl: string = 'http://localhost:4500/api/v1/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ResCategory> {
    return this.http.get<ResCategory>(this.apiUrl);
  }

  addCategorie(data: Category): Observable<ResOneCategory> {
    return this.http.post<ResOneCategory>(this.apiUrl, data);
  }

  deleteCategory(id: string): Observable<ResOneCategory> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ResOneCategory>(url);
  }

  updateCategory(id: string, category: Category): Observable<ResOneCategory> {
    return this.http.patch<ResOneCategory>(`${this.apiUrl}/${id}`, category);
  }

  getCategory(id: string): Observable<ResOneCategory> {
    return this.http.get<ResOneCategory>(`${this.apiUrl}/${id}`);
  }
}
