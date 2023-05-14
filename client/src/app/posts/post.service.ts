import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private _httpClient: HttpClient) {}

  // getCompanies(): Observable<any> {
  //   return this._httpClient.get('company');
  // }

  createPost(): Observable<any> {
    let obj = {
      title: 'New title',
      // desc
    };
    return this._httpClient.post(`http://localhost:3000/products`, obj);
  }

  // updateContact(idntfr: string, record: ContactInsurerModel): Observable<any> {
  //   return this._httpClient.put(`contact-insurers/update-contact/${idntfr}`, record);
  // }

  // deleteContact(idntfr: string): Observable<any> {
  //   return this._httpClient.delete(`contact-insurers/delete-contact/${idntfr}`);
  // }
}
