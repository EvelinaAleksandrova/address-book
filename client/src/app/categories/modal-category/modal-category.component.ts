import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../categories.service';
import { MenuType } from '../../shared/enums';
import { CategoryModel } from '../models/category.model';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})
export class ModalCategoryComponent implements OnInit {
  msg: { title: string; text: string };
  categoryFormGroup: FormGroup;
  action: string;
  category: CategoryModel;

  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalCategoryComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.categoryFormGroup = this.formBuilder.group({
      label: [null, [Validators.maxLength(50), Validators.required]],
      note: [null, Validators.maxLength(1500)]
    });

    this.msg = this.data.msg;
    this.action = this.data.action;
    this.category = this.data.category;

    if (this.action === MenuType.edit) {
      for (const key in this.category) {
        if (key !== 'code') {
          if (Object.keys(this.categoryFormGroup.controls).includes(key)) {
            this.categoryFormGroup.controls[key].setValue(this.category[key]);
          }
        }
      }
    }
  }

  closeDialog(choice: boolean) {
    if (choice) {
      if (this.categoryFormGroup.invalid) {
        this.categoryFormGroup.markAllAsTouched();
        return;
      }
      this.isLoading = true;

      if (this.action === MenuType.create) {
        this.categoriesService.createCategory(this.categoryFormGroup.value).subscribe({
          next: res => {
            this.dialogRef.close(choice);
            this.isLoading = false;
          },
          error: res => {
            this.setError(res);
          }
        });
      } else {
        this.categoriesService.updateCategory(this.category.code, this.categoryFormGroup.value).subscribe({
          next: res => {
            this.dialogRef.close(choice);
            this.isLoading = false;
          },
          error: res => {
            this.setError(res);
          }
        });
      }
    } else {
      this.dialogRef.close(choice);
    }
  }

  private setError(res) {
    if (res.status === 400) {
      this.categoryFormGroup.controls['label'].setErrors({ duplicate: true });
    }
    this.isLoading = false;
  }
}
