import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReminderModel } from './models/reminder.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RemindersService } from './reminders.service';
import { modalMessages } from '../shared/messages';
import { MenuType, Reminders } from '../shared/enums';
import { ModalReminderComponent } from './modal-reminder/modal-reminder.component';
import { ContactModel } from '../contacts/models/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  menuType: string = '';
  currentCategoryId: string = '';

  isLoading: boolean = true;
  isOpenNotification: boolean = false;

  displayedColumns: string[] = ['contact', 'date', 'reminder', 'note', 'button'];
  remindersData: any[] = [];
  reminders = [];

  contacts: ContactModel[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  remindersDataSource: MatTableDataSource<ReminderModel> = new MatTableDataSource();

  filters: { name: string; value: string }[] = [];

  constructor(private remindersService: RemindersService, private contactsService: ContactsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reminders = Reminders;
    this.contactsService.getAllContacts().subscribe(res => {
      this.contacts = res;
    });
    this.getRemindersData();
  }

  openNotifications() {
    console.log('open');
    this.isOpenNotification = !this.isOpenNotification;
  }

  getRemindersData(goToFirstPage = false) {
    this.isLoading = true;
    goToFirstPage && !!this.paginator && (this.paginator.pageIndex = 0);

    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const query = {};

    for (let filter of this.filters) {
      query[filter.name] = filter.value;
    }

    this.remindersService.getPaginatedFilteredReminders(pageSize, pageIndex, query).subscribe({
      next: res => {
        this.remindersDataSource.data = res.filteredRecords;
        this.tableSize = res.count;
        this.pageSize = pageSize;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  openReminderModal() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.CREATE_REMINDER },
      action: MenuType.create,
      contacts: this.contacts,
      reminders: this.reminders
    };
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(ModalReminderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getRemindersData(true);
      }
    });
  }

  openSearch() {}

  editReminder(reminder: ReminderModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.EDIT_REMINDER },
      action: MenuType.edit,
      reminder: reminder,
      contacts: this.contacts,
      reminders: this.reminders
    };
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(ModalReminderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getRemindersData(true);
      }
    });
  }

  deleteReminder(reminder: ReminderModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.DELETE_REMINDER }
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.isLoading = true;
        this.remindersService.deleteReminder(reminder.id).subscribe({
          next: res => {
            this.getRemindersData(true);
          },
          error: () => (this.isLoading = false)
        });
      }
    });
  }
}
