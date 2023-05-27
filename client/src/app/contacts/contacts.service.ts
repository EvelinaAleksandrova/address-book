import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactModel } from './models/contact.model';
import { environment } from '../../environments/environment';
import { FilteredContacts } from './models/filtererd-contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private _httpClient: HttpClient) {}

  createContact(contact: ContactModel): Observable<any> {
    console.log(environment.url);
    return this._httpClient.post(`${environment.url}/contacts/create-contact`, contact);
  }

  updateContact(id: string, contact: ContactModel): Observable<any> {
    return this._httpClient.put(`${environment.url}/contacts/update-contact/${id}`, contact);
  }

  deleteContact(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.url}/contacts/delete-contact/${id}`);
  }

  getPaginatedFilteredContacts(pageSize: number, pageIndex: number, query): Observable<FilteredContacts> {
    return this._httpClient.get<FilteredContacts>(`${environment.url}/contacts/filtered/${pageSize}/${pageIndex}`, { params: query });
  }
}
