/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { Category } from '@hcoding/shared';
import { CategoryService } from '@hcoding/shared';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  submit(form: FormGroup) {
    if (form.invalid) {
      this.toastr.warning('Please fill your form', 'Error', {
        positionClass: 'toast-top-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        tapToDismiss: false,
        toastClass: 'ngx-toastr icon error',
        iconClasses: {
          error: 'fa fa-exclamation-triangle',
          //error: 'toast-error',
        },
      } as any);
      return;
    }

    this.saveCategory();
  }

  saveCategory() {
    this.categoryService
      .addCategorie(this.categoryForm.value)
      .subscribe(() => this.router.navigate(['/admin/category']));
  }
}
