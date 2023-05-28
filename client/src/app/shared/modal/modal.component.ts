import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  msg: { title: string; text: string };

  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.msg = this.data.msg;
  }

  closeDialog(choice: boolean) {
    this.dialogRef.close(choice);
  }
}
