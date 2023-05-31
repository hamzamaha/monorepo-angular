/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ProductService } from './../../../../../../libs/shared/src/lib/services/product.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '@hcoding/shared';

@Component({
  selector: 'admin-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id: string = '';
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  productForm = new FormGroup({
    title: new UntypedFormControl('', [
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.required,
    ]),
    content: new UntypedFormControl('', [Validators.required]),

    description: new UntypedFormControl('', [Validators.required]),
    category: new UntypedFormControl('', [Validators.required]),
    price: new UntypedFormControl('', [Validators.required]),
    thumbnail: new UntypedFormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.productService.getProduct(params.id).subscribe((res) => {
        this.id = params.id;
        console.log(res.product);
        this.productForm.patchValue(res.product);
      });
    });

    this.getCategories();
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

  submit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.updateProduct();
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('title', this.productForm.get('title')?.value);
    formData.append('content', this.productForm.get('content')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('category', this.productForm.get('category')?.value);

    const thumbnailInput = document.getElementById(
      'thumbnail'
    ) as HTMLInputElement;
    if (thumbnailInput.files && thumbnailInput.files.length > 0) {
      const file = thumbnailInput.files[0];
      formData.append('thumbnail', file, file.name);

      // Create a new FileReader object
      const reader = new FileReader();

      // Set up the onload event handler to update the file input value
      reader.onload = () => {
        this.productForm.patchValue({ thumbnail: reader.result });
      };

      // Read the selected file as a binary string
      reader.readAsBinaryString(file);
    }

    this.productService.updateProduct(this.id, formData).subscribe(
      (res) => {
        if (res.success) {
          this.location.back();
        }
      },
      (err) => console.error(err)
    );
  }
}
