import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})
export class ModalCategoryComponent implements OnInit {
  msg: { title: string; text: string };

  constructor(private dialogRef: MatDialogRef<ModalCategoryComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.msg = this.data.msg;
  }

  closeDialog(choice: boolean) {
    if (choice) {
      this.dialogRef.close({ choice: choice, category: {} });
    } else {
      this.dialogRef.close({ choice: choice });
    }
  }
}
