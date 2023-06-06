import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReminderModel } from '../models/reminder.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RemindersService } from '../reminders.service';
import { MenuType } from '../../shared/enums';
import { ContactModel } from '../../contacts/models/contact.model';

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
  reminders = [];
  minDate: Date = new Date()

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
      reminder: [null],
      date: [null, Validators.required],
      note: [null, Validators.maxLength(1500)]
    });

    this.msg = this.data.msg;
    this.action = this.data.action;
    this.reminder = this.data.category;
    this.contacts = this.data.contacts;
    this.reminders = this.data.reminders;

    if (this.action === MenuType.edit) {
      for (const key in this.reminder) {
        if (key !== 'code') {
          if (Object.keys(this.reminderFormGroup.controls).includes(key)) {
            this.reminderFormGroup.controls[key].setValue(this.reminder[key]);
          }
        }
      }
    }
  }

  closeDialog(choice: boolean) {
    if (choice) {
      if (this.reminderFormGroup.invalid) {
        this.reminderFormGroup.markAllAsTouched();
        return;
      }
      this.isLoading = true;

      if (this.action === MenuType.create) {
        console.log(this.reminderFormGroup.value);
        this.reminderService.createReminder(this.reminderFormGroup.value).subscribe({
          next: res => {
            this.dialogRef.close(choice);
            this.isLoading = false;
          },
          error: res => {
            this.isLoading = false;
          }
        });
      } else {
        this.reminderService.updateReminder(this.reminder.id, this.reminderFormGroup.value).subscribe({
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
