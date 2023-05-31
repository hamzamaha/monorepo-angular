/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Category,
  ResCategory,
  ResOneCategory,
} from './../../../../../../libs/shared/src/lib/models/category';
import { CategoryService } from './../../../../../../libs/shared/src/lib/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css'],
})
export class ListcategoryComponent implements OnInit {
  categories: Category[] | undefined = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe(
        ({ categories, success }: ResCategory) => (this.categories = categories)
      );
  }

  updateCategory(id: string, category: Category) {
    this.categoryService.updateCategory(id, category).subscribe((data) => {
      console.log(data);
      this.getCategories();
    });
  }

  deleteCategory(id: string) {
    this.categoryService
      .deleteCategory(id)
      .subscribe(({ success }: ResOneCategory) => {
        if (success) {
          this.getCategories();
        }
      });
  }
}
