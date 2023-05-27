import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuType } from '../shared/enums';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class AddressRecordsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  pageSizes = [10, 11, 12];
  contactFormGroup: FormGroup;

  menuType: string = '';

  isLoading: boolean = true;
  isActionMode: boolean = false;

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'gender', 'jobtitle', 'department'];
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
  EmpData: any[] = [
    {
      id: 1,
      firstname: 'Mellie',
      lastname: 'Gabbott',
      email: 'mgabbott0@indiatimes.com',
      gender: 'Female',
      department: 'Support',
      jobtitle: 'Support Analyst',
      project: { name: 'project1', id: 1 }
    },
    {
      id: 2,
      firstname: 'Yehudi',
      lastname: 'Ainsby',
      email: 'yainsby1@w3.org',
      gender: 'Female',
      department: 'Support',
      jobtitle: 'Support Analyst',
      project: { name: 'project2', id: 2 }
    },
    {
      id: 3,
      firstname: 'Noellyn',
      lastname: 'Primett',
      email: 'nprimett2@ning.com',
      gender: 'Female',
      department: 'Human Resources',
      jobtitle: 'Project Manager',
      project: { name: 'project3', id: 3 }
    },
    {
      id: 4,
      firstname: 'Stefanie',
      lastname: 'Yurenin',
      email: 'syurenin3@boston.com',
      gender: 'Female',
      department: 'Marketing',
      jobtitle: 'Senior officer',
      project: { name: 'project4', id: 4 }
    },
    {
      id: 5,
      firstname: 'Stormi',
      lastname: "O'Lunny",
      email: 'solunny4@patch.com',
      gender: 'Female',
      department: 'Engineering',
      jobtitle: 'Software Engineer',
      project: { name: 'project5', id: 5 }
    },
    {
      id: 6,
      firstname: 'Keelia',
      lastname: 'Giraudy',
      email: 'kgiraudy5@nba.com',
      gender: 'Male',
      department: 'Marketing',
      jobtitle: 'Senior officer',
      project: { name: 'project6', id: 6 }
    },
    {
      id: 7,
      firstname: 'Ikey',
      lastname: 'Laight',
      email: 'ilaight6@wiley.com',
      gender: 'Male',
      department: 'Support',
      jobtitle: 'Support Analyst',
      project: { name: 'project7', id: 7 }
    },
    {
      id: 8,
      firstname: 'Adrianna',
      lastname: 'Ruddom',
      email: 'aruddom7@seattletimes.com',
      gender: 'Male',
      department: 'Marketing',
      jobtitle: 'Senior officer',
      project: { name: 'project8', id: 8 }
    },
    {
      id: 9,
      firstname: 'Dionysus',
      lastname: 'McCory',
      email: 'dmccory8@ox.ac.uk',
      gender: 'Male',
      department: 'Engineering',
      jobtitle: 'Software Engineer',
      project: { name: 'project9', id: 9 }
    },
    {
      id: 10,
      firstname: 'Claybourne',
      lastname: 'Shellard',
      email: 'cshellard9@rediff.com',
      gender: 'Male',
      department: 'Engineering',
      jobtitle: 'Software Engineer',
      project: { name: 'project10', id: 10 }
    }
  ];

  dataSource = new MatTableDataSource(this.EmpData);
  dataSourceWithPageSize = new MatTableDataSource(this.EmpData);

  constructor(private formBuilder: FormBuilder) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  ngOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: [null, Validators.maxLength(100)],
      phone: [null, Validators.maxLength(15)],
      email: [
        null,
        [
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      type: [null]
    });
    this.isLoading = false;
  }

  openContactDrawer() {
    console.log('Here');
    this.menuType = MenuType.create;
    this.isActionMode = true;
    this.drawer.toggle();
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

    // const method =
    //   this.action === TypeMenu.create
    //     ? this.contactService.createContact({ ...this.contactFormGroup.value })
    //     : this.contactService.updateContact(this.currentContactId, { ...this.contactFormGroup.value });

    // method.subscribe({
    //   next: () => {
    //     this.closeDrawerForm();
    //     this.getContactsData();
    //   },
    //   error: () => (this.loading = false)
    // });
  }

  closeDrawer(type: string): void {
    if (type === 'contactForm') {
      this.drawer.close();
      this.contactFormGroup.reset();
    }
    this.isActionMode = false;
  }
}
