/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from '@angular/router';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'libs/users/src/lib/services/storage.service';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  user: string | null = null;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.storageService.user.subscribe((name: string | null) => {
      this.user = name;
    });
  }

  logOut() {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
