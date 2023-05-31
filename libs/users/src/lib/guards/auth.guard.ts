/* eslint-disable no-unused-labels */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: string | null = this.storageService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (token.split('.').length == 3) {
      const payload = token.split('.')[1];
      const decodePayload = JSON.parse(atob(payload));
      this.storageService.setUser(decodePayload.name);
      return (
        decodePayload.isAdmin &&
        !this.storageService.expiredToken(decodePayload.exp)
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
