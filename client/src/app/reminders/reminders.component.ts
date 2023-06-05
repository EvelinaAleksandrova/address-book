import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReminderModel } from './models/reminder.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RemindersService } from './reminders.service';

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

  displayedColumns: string[] = ['contact', 'date', 'note', 'button'];
  remindersData: any[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  remindersDataSource: MatTableDataSource<ReminderModel> = new MatTableDataSource();

  filters: { name: string; value: string }[] = [];

  constructor(private remindersService: RemindersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getRemindersData();
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
    //   let dialogConfig = new MatDialogConfig();
    //   dialogConfig.data = {
    //     msg: { title: modalMessages.CREATE_CATEGORY },
    //     action: MenuType.create
    //   };
    //   dialogConfig.width = '50%';
    //   const dialogRef = this.dialog.open(ModalCategoryComponent, dialogConfig);
    //   dialogRef.afterClosed().subscribe(res => {
    //     if (res) {
    //       this.getRemindersData(true);
    //     }
    //   });
  }

  openSearch() {}

  editReminder(category: ReminderModel) {
    // let dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   msg: { title: modalMessages.EDIT_CATEGORY },
    //   action: MenuType.edit,
    //   category: category
    // };
    // dialogConfig.width = '50%';
    // const dialogRef = this.dialog.open(ModalCategoryComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this.getRemindersData(true);
    //   }
    // });
  }

  deleteReminder(category: ReminderModel) {
    // let dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   msg: { title: modalMessages.DELETE_CATEGORY }
    // };
    // const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((res: boolean) => {
    //   if (res) {
    //     this.isLoading = true;
    //     this.remindersService.deleteCategory(category.code).subscribe({
    //       next: res => {
    //         this.getRemindersData(true);
    //       },
    //       error: () => (this.isLoading = false)
    //     });
    //   }
    // });
  }
}
