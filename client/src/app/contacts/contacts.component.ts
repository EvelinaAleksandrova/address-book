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

  typeData: any[] = [
    {
      code: 1,
      label: 'Urgent'
    },
    {
      code: 2,
      label: 'Urgent'
    },
    {
      code: 3,
      label: 'Urgent'
    },
    {
      code: 4,
      label: 'Urgent'
    },
    {
      code: 5,
      label: 'Urgent'
    }
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

  openContactDrawer() {
    console.log('Here');
    this.menuType = MenuType.create;
    this.isActionMode = true;
    this.drawer.toggle();
  }

  openSearch() {}

  editContact(contact: ContactModel) {
    console.log(contact);
    this.menuType = MenuType.edit;
    this.isActionMode = true;
    this.currentContactId = contact.id;
    this.drawer.open();

    for (const key in contact) {
      if (Object.keys(this.contactFormGroup.controls).includes(key)) {
        this.contactFormGroup.controls[key].setValue(contact[key]);
      }
    }
  }

  deleteContact(contact: ContactModel) {
    console.log(contact);
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
