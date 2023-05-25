/* eslint-disable  */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { RouterModule } from '@angular/router';
import { AddressRecordsComponent } from './address-records/address-records.component';
import { AuthComponent } from './auth/auth.component';
import { LabelsComponent } from './labels/labels.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    AddressRecordsComponent,
    AuthComponent,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: AddressRecordsComponent },
      { path: 'contacts', component: AddressRecordsComponent },
      { path: 'labels', component: LabelsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
