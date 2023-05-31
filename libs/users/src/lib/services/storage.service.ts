import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly APP_TOKEN = 'app_token';

  // emailSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  user = new BehaviorSubject<string | null>(null);

  // Token = new BehaviorSubject<string | null>(null);

  // setToken(token: string) {
  //   return this.Token.next(token);
  // }
  // getToken() {
  //   return this.Token.getValue();
  // }
  // removeToken() {
  //   return this.Token.next(null);
  // }

  setUser(name: string | null) {
    this.user.next(name);
  }

  // getPayload() {
  //   const token = this.getToken();
  //   if (token && token.split('.').length == 3) {
  //     const payload = token.split('.')[1];
  //     const data = JSON.parse(atob(payload));
  //     this.setUser(data.name);
  //     return data;
  //   }
  //   return null;
  // }

  setToken(data: string) {
    localStorage.setItem(this.APP_TOKEN, data);
  }

  getToken() {
    return localStorage.getItem(this.APP_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.APP_TOKEN);
  }

  expiredToken(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  //store and get user email in the localStorage
  // setEmail(data: string) {
  //   localStorage.setItem(this.Email, data);
  //   this.emailSubject.next(data);
  // }

  // getEmail() {
  //   return localStorage.getItem(this.Email);
  // }
  // removeEmail() {
  //   localStorage.removeItem(this.Email);
  //   this.emailSubject.next('');
  // }
}
