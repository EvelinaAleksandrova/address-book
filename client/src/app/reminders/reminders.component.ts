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
import { CategoriesService } from '../categories/categories.service';
import { forkJoin, takeUntil } from 'rxjs';
import { CategoryModel } from '../categories/models/category.model';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  menuType: string = '';

  isLoading: boolean = true;
  isOpenNotification: boolean = false;

  displayedColumns: string[] = ['contact', 'date', 'time', 'reminder', 'note', 'button'];
  remindersData: any[] = [];
  reminders = [];
  notifications = [];

  contacts: ContactModel[] = [];
  categories: CategoryModel[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  remindersDataSource: MatTableDataSource<ReminderModel> = new MatTableDataSource();

  constructor(
    private remindersService: RemindersService,
    private contactsService: ContactsService,
    private categoriesServiece: CategoriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reminders = Reminders;
    forkJoin([this.contactsService.getAllContacts(), this.categoriesServiece.getAllCategories()]).subscribe(([contacts, categories]) => {
      this.contacts = contacts;
      this.categories = categories;
    });

    this.getRemindersData();

    setInterval(() => {
      let today: any = new Date();
      let todayWithHours: any = new Date();
      todayWithHours.setHours(0, 0, 0, 0);
      this.notifications = [];

      for (const event of this.remindersDataSource.data) {
        if (!event.isEventViewed) {
          let eventDate: any = new Date(event.date);
          if (event.reminder) {
            let regExEventTime = /([0-9][0-9]):([0-9][0-9])/;
            let regExEventTimeArr = regExEventTime.exec(event.time);

            let hours: number = Number(regExEventTimeArr[1]);
            let minutes: number = Number(regExEventTimeArr[2]);

            eventDate.setHours(hours);
            eventDate.setMinutes(minutes - event.reminder);

            if (today > eventDate || eventDate.toString() === today.toString()) {
              this.notifications.push(event);
            }
          } else if (eventDate.toString() === todayWithHours.toString()) {
            let regExEventTime = /([0-9][0-9]):([0-9][0-9])/;
            let regExEventTimeArr = regExEventTime.exec(event.time);

            let hours: number = Number(regExEventTimeArr[1]) * 60; //hours in minutes
            let minutes: number = Number(regExEventTimeArr[2]);

            let currentHours = today.getHours() * 60; //hours in minutes
            let currentMinutes = today.getMinutes();

            let eventTimeInMinutes = hours + minutes;
            let currentTimeInMinutes = currentHours + currentMinutes;
            if (currentTimeInMinutes >= eventTimeInMinutes) {
              this.notifications.push(event);
            }
          }
          this.notifications.sort(function (notification1, notification2) {
            return new Date(notification1.date).getTime() - new Date(notification2.date).getTime();
          });
        }
      }
    }, 1500);


  }

  openNotifications() {
    this.isOpenNotification = !this.isOpenNotification;
  }

  getRemindersData(goToFirstPage = false) {
    this.isLoading = true;
    goToFirstPage && !!this.paginator && (this.paginator.pageIndex = 0);

    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const query = {};

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
      categories: this.categories,
      reminders: this.reminders
    };
    dialogConfig.width = '25%';
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
    dialogConfig.width = '25%';
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

  markEventAsViewed(notification) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.MARK_AS_VIEWED }
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.isLoading = true;
        this.remindersService.markEventAsViewed(notification.id).subscribe({
          next: res => {
            this.getRemindersData(true);
          },
          error: () => (this.isLoading = false)
        });
      }
    });
  }
}
