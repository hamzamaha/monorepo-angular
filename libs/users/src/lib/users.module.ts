import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { SinginComponent } from './components/singin/singin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [SinginComponent],
})
export class UsersModule {}
