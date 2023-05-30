import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressRecordsComponent } from './contacts/contacts.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', component: AddressRecordsComponent },
  { path: 'contacts', component: AddressRecordsComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
