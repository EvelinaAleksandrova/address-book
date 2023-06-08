import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuType } from '../shared/enums';
import { ContactsService } from './contacts.service';
import { SearchContact } from './models/contact-search.model';
import { ContactModel } from './models/contact.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { modalMessages } from '../shared/messages';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalContactComponent } from './modal-contact/modal-contact.component';
import { CategoriesService } from '../categories/categories.service';
import { CategoryModel } from '../categories/models/category.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class AddressRecordsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  menuType: string = '';
  currentContactId: string = '';

  isLoading: boolean = true;
  isActionMode: boolean = false;

  categoriesData: CategoryModel[] = [];

  displayedColumns: string[] = ['name', 'phone', 'email', 'address', 'company', 'department', 'note', 'category', 'button'];

  // filterNames: { code: string; label: string }[] = [
  //   { code: 'company', label: 'Company' },
  //   { code: 'department', label: 'Department' },
  //   { code: 'name', label: 'Name' },
  //   { code: 'phone', label: 'Phone' },
  //   { code: 'email', label: 'Email' },
  //   { code: 'note', label: 'Note' },
  //   { code: 'address', label: 'Address' }
  // ];

  contactsData: any[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  contactsDataSource: MatTableDataSource<ContactModel> = new MatTableDataSource();

  constructor(private contactService: ContactsService, private dialog: MatDialog, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(res => {
      this.categoriesData = res;
    });
    this.getContactsData();
  }

  getContactsData(goToFirstPage = false) {
    this.isLoading = true;
    goToFirstPage && !!this.paginator && (this.paginator.pageIndex = 0);

    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const query: SearchContact = {};

    this.contactService.getPaginatedFilteredContacts(pageSize, pageIndex, query).subscribe({
      next: res => {
        this.contactsDataSource.data = res.filteredRecords;
        this.tableSize = res.count;
        this.pageSize = pageSize;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  openContactModal() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.CREATE_CONTACT },
      action: MenuType.create,
      categoriesData: this.categoriesData
    };

    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(ModalContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getContactsData(true);
      }
    });
  }

  openSearch() {}

  editContact(contact: ContactModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.EDIT_CONTACT },
      action: MenuType.edit,
      contact: contact,
      categoriesData: this.categoriesData
    };

    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(ModalContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getContactsData(true);
      }
    });
  }

  deleteContact(contact: ContactModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.DELETE_CONTACT }
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.isLoading = true;
        this.contactService.deleteContact(contact.id).subscribe({
          next: res => {
            this.getContactsData(true);
          },
          error: () => (this.isLoading = false)
        });
      }
    });
  }
}
