import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListcategoryComponent } from './pages/listcategory/listcategory.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
import { AddOrdersComponent } from './pages/add-orders/add-orders.component';
import { AuthGuard } from '@hcoding/users';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/category',
    component: ListcategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/category/add',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/category/edit/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product',
    component: ListProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product/add',
    component: AddUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users/add',
    component: AddUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product/edit/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users/edit/:id',
    component: EditUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders',
    component: ListOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders/add',
    component: AddOrdersComponent,
    canActivate: [AuthGuard],
  },
];
