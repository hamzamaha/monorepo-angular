/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@hcoding/shared';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  id: string = '';

  labelPattern = /^[a-zA-Z0-9 ]{3,19}$/;
  iconPattern = /^[a-zA-Z-]{4,30}$/;
  categoryForm = new FormGroup({
    label: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(19),
      Validators.pattern(this.iconPattern),
    ]),
    icon: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern(this.iconPattern),
    ]),
    color: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern('#[a-fA-F0-9]{6}'),
    ]),
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.categoryService.getCategory(params.id).subscribe((res) => {
        this.id = params.id;
        this.categoryForm.patchValue(res.category);
      });
    });
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.updateCategory();
  }

  updateCategory() {
    this.categoryService
      .updateCategory(this.id, this.categoryForm.value)
      .subscribe(
        (res) => {
          if (res.success) {
            this.location.back();
          }
        },
        (err) => console.error(err)
      );
  }
}
