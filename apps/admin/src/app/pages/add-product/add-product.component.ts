/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryService,
  Product,
  ResCategory,
} from '@hcoding/shared';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ProductService } from 'libs/shared/src/lib/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({
    title: new UntypedFormControl('', [
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.required,
    ]),
    content: new UntypedFormControl('', [Validators.required]),

    description: new UntypedFormControl('', [Validators.required]),
    category: new UntypedFormControl('', [Validators.required]),
    brand: new UntypedFormControl('', [Validators.required]),
    price: new UntypedFormControl('', [Validators.required]),
    thumbnail: new UntypedFormControl('', [Validators.required]),
  });

  categories: Category[] = [];

  constructor(
    private productsService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.addProduct();
  }

  addProduct() {
    const formData = new FormData();
    formData.append('title', this.productForm.get('title')?.value);
    formData.append('content', this.productForm.get('content')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('brand', this.productForm.get('brand')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('category', this.productForm.get('category')?.value);

    const thumbnailInput = document.getElementById(
      'thumbnail'
    ) as HTMLInputElement;
    if (thumbnailInput.files && thumbnailInput.files.length > 0) {
      formData.append('thumbnail', thumbnailInput.files[0]);
    }

    console.log(formData.get('thumbnail'));

    this.productsService.addProduct(formData).subscribe(() => {
      this.router.navigate(['/admin/product']);
    });
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res) => {
        this.categories = res.categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
