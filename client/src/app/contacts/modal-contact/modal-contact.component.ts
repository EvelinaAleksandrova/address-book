import { Component, Inject, OnInit } from '@angular/core';
import { MenuType } from '../../shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from '../models/contact.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../contacts.service';
import { CategoryModel } from '../../categories/models/category.model';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.css']
})
export class ModalContactComponent implements OnInit {
  msg: { title: string; text: string };
  contactFormGroup: FormGroup;
  action: string;
  contact: ContactModel;
  categoriesData: CategoryModel[] = [];

  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalContactComponent>,
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.contactFormGroup = this.formBuilder.group({
      name: [null, [Validators.maxLength(150), Validators.required]],
      phone: [null, [Validators.maxLength(15), Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
      email: [
        null,
        [
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      company: [null, Validators.maxLength(150)],
      department: [null, Validators.maxLength(150)],
      note: [null, Validators.maxLength(1500)],
      address: [null, Validators.maxLength(150)],
      category: [null]
    });

    this.msg = this.data.msg;
    this.action = this.data.action;
    this.contact = this.data.contact;
    this.categoriesData = this.data.categoriesData;

    if (this.action === MenuType.edit) {
      for (const key in this.contact) {
        if (key !== 'code') {
          if (Object.keys(this.contactFormGroup.controls).includes(key)) {
            this.contactFormGroup.controls[key].setValue(this.contact[key]);
          }
        }
      }
    }
  }

  closeDialog(choice: boolean) {
    if (choice) {
      if (this.contactFormGroup.invalid) {
        this.contactFormGroup.markAllAsTouched();
        return;
      }
      this.isLoading = true;

      if (this.action === MenuType.create) {
        this.contactsService.createContact(this.contactFormGroup.value).subscribe({
          next: res => {
            this.dialogRef.close(choice);
            this.isLoading = false;
          },
          error: res => {
            this.isLoading = false;
          }
        });
      } else {
        this.contactsService.updateContact(this.contact.id, this.contactFormGroup.value).subscribe({
          next: res => {
            this.dialogRef.close(choice);
            this.isLoading = false;
          },
          error: res => {
            this.isLoading = false;
          }
        });
      }
    } else {
      this.dialogRef.close(choice);
    }
  }
}
