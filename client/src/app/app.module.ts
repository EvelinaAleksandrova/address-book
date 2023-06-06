/* eslint-disable  */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { AddressRecordsComponent } from './contacts/contacts.component';
import { AppRoutingModule } from './app-routing.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { ModalComponent } from './shared/modal/modal.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModalCategoryComponent } from './categories/modal-category/modal-category.component';
import { RemindersComponent } from './reminders/reminders.component';
import { ModalContactComponent } from './contacts/modal-contact/modal-contact.component';
import { GetLabelByCodePipe } from './shared/pipes/label-by-code-display.pipe';
import { ModalReminderComponent } from './reminders/modal-reminder/modal-reminder.component';
import { GetNameByIdPipe } from './shared/pipes/name-by-id-display.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddressRecordsComponent,
    LoaderComponent,
    ModalComponent,
    CategoriesComponent,
    ModalCategoryComponent,
    RemindersComponent,
    ModalContactComponent,
    GetLabelByCodePipe,
    GetNameByIdPipe,
    ModalReminderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,

    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
