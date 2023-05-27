import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressRecordsComponent } from './contacts/contacts.component';
import { LabelsComponent } from './labels/labels.component';

const routes: Routes = [
  { path: '', component: AddressRecordsComponent },
  { path: 'contacts', component: AddressRecordsComponent },
  { path: 'labels', component: LabelsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
