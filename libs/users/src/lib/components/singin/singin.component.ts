/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../models/authResponse';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
})
export class SinginComponent {
  authError = false;
  messageError = 'Error is from the server ,please try again';

  loginForm = new FormGroup({
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  get form() {
    return this.loginForm.controls;
  }
  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.signIn(this.form.email.value, this.form.password.value);
  }

  signIn(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (res: AuthResponse) => {
        this.storageService.setToken(res.token);
        this.authError = false;
        this.loginForm.reset();
        this.router.navigate(['/admin/category']);
      },
      error: (err: HttpErrorResponse) => {
        this.authError = true;
        if (err.status == 400) {
          this.messageError = err.error.message;
        }
      },
    });
  }
}
