import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuType } from '../shared/enums';
import { ContactsService } from './contacts.service';
import { SearchContact } from './models/contact-search.model';
import { ContactModel } from './models/contact.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { modalMessages } from '../shared/messages';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalContactComponent } from './modal-contact/modal-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class AddressRecordsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  contactFormGroup: FormGroup;

  menuType: string = '';
  currentContactId: string = '';

  isLoading: boolean = true;
  isActionMode: boolean = false;

  displayedColumns: string[] = ['name', 'phone', 'email', 'address', 'company', 'department', 'note', 'button'];
  filters: { name: string; value: string }[] = [];

  filterNames: { code: string; label: string }[] = [
    { code: 'company', label: 'Company' },
    { code: 'department', label: 'Department' },
    { code: 'name', label: 'Name' },
    { code: 'phone', label: 'Phone' },
    { code: 'email', label: 'Email' },
    { code: 'note', label: 'Note' },
    { code: 'address', label: 'Address' }
  ];

  contactsData: any[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  contactsDataSource: MatTableDataSource<ContactModel> = new MatTableDataSource();

  constructor(private contactService: ContactsService, private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
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
      type: [null]
    });
    this.getContactsData();
  }

  getContactsData(goToFirstPage = false) {
    this.isLoading = true;
    goToFirstPage && !!this.paginator && (this.paginator.pageIndex = 0);

    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const query: SearchContact = {};

    for (let filter of this.filters) {
      query[filter.name] = filter.value;
    }

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
      action: MenuType.create
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
      contact: contact
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

  saveContact() {
    if (this.contactFormGroup.invalid) {
      this.contactFormGroup.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    if (this.contactFormGroup.get('email').value === '') {
      this.contactFormGroup.get('email').setValue(null);
    }

    const method =
      this.menuType === MenuType.create
        ? this.contactService.createContact({ ...this.contactFormGroup.value })
        : this.contactService.updateContact(this.currentContactId, { ...this.contactFormGroup.value });

    method.subscribe({
      next: () => {
        this.closeDrawer('contactForm');
        this.getContactsData();
      },
      error: () => (this.isLoading = false)
    });
  }

  closeDrawer(type: string): void {
    if (type === 'contactForm') {
      this.drawer.close();
      this.contactFormGroup.reset();
    }
    this.isActionMode = false;
  }
}
