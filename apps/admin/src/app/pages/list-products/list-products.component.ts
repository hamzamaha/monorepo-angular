/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Product,
  ResOneProduct,
  ResProduct,
} from './../../../../../../libs/shared/src/lib/models/product';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ProductService } from './../../../../../../libs/shared/src/lib/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] | undefined = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getAllProducts()
      .subscribe(
        ({ products, success }: ResProduct) => (this.products = products)
      );
  }

  deleteProduct(id: string) {
    this.productService
      .deleteProduct(id)
      .subscribe(({ success }: ResOneProduct) => {
        if (success) {
          this.getProducts();
        }
      });
  }
}
