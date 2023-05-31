import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListcategoryComponent } from './pages/listcategory/listcategory.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
import { AddOrdersComponent } from './pages/add-orders/add-orders.component';
import { AuthGuard, AuthInterceptor, UsersModule } from '@hcoding/users';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ListcategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ListUsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    ListOrdersComponent,
    AddOrdersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsersModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
