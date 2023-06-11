import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReminderModel } from '../models/reminder.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RemindersService } from '../reminders.service';
import { MenuType } from '../../shared/enums';
import { ContactModel } from '../../contacts/models/contact.model';
import { CategoryModel } from '../../categories/models/category.model';

@Component({
  selector: 'app-modal-reminder',
  templateUrl: './modal-reminder.component.html',
  styleUrls: ['./modal-reminder.component.css']
})
export class ModalReminderComponent implements OnInit {
  msg: { title: string; text: string };
  reminderFormGroup: FormGroup;
  action: string;
  reminder: ReminderModel;
  contacts: ContactModel[] = [];
  categories: CategoryModel[] = [];
  reminders = [];
  minDate: Date = new Date();
  currentContact = '';

  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalReminderComponent>,
    private formBuilder: FormBuilder,
    private reminderService: RemindersService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.reminderFormGroup = this.formBuilder.group({
      contact: [null, [Validators.required]],
      category: [null],
      reminder: [null],
      date: [null, Validators.required],
      time: [null, Validators.required],
      note: [null, Validators.maxLength(1500)]
    });

    this.msg = this.data.msg;
    this.action = this.data.action;
    this.reminder = this.data.reminder;
    this.contacts = this.data.contacts;
    this.reminders = this.data.reminders;
    this.categories = this.data.categories;

    if (this.action === MenuType.edit) {
      for (const key in this.reminder) {
        if (key !== 'id') {
          if (Object.keys(this.reminderFormGroup.controls).includes(key)) {
            this.reminderFormGroup.controls[key].setValue(this.reminder[key]);
          }
        }
      }
    }
  }

  onChangeContact(contact) {
    this.currentContact = contact.value;
  }

  closeDialog(choice: boolean) {
    if (choice) {
      if (this.reminderFormGroup.invalid) {
        this.reminderFormGroup.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      let method;

      if (this.currentContact !== '') {
        let foundContact = this.contacts.filter(contact => contact.id === this.currentContact);
        if (foundContact) {
          if (foundContact[0].category) {
            this.reminderFormGroup.get('category').setValue(foundContact[0].category);
          }
        }
      }
      this.action === MenuType.create
        ? (method = this.reminderService.createReminder(this.reminderFormGroup.value))
        : (method = this.reminderService.updateReminder(this.reminder.id, this.reminderFormGroup.value));

      method.subscribe({
        next: res => {
          this.dialogRef.close(choice);
          this.isLoading = false;
        },
        error: res => {
          this.isLoading = false;
        }
      });
    } else {
      this.dialogRef.close(choice);
    }
  }
}
