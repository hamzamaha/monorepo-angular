/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResOneUser, ResUser, User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://localhost:4500/api/v1/users';
  url: string = 'http://localhost:4500/api/v1/users/register';

  getAllUsers(): Observable<ResUser> {
    return this.http.get<ResUser>(this.apiUrl);
  }

  addCategorie(data: User): Observable<ResOneUser> {
    return this.http.post<ResOneUser>(this.url, data);
  }

  deleteUser(id: string): Observable<ResOneUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ResOneUser>(url);
  }
}
