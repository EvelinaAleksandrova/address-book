import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReminderModel } from './models/reminder.model';
import { FilteredReminders } from './models/filtered-reminders.model';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  constructor(private _httpClient: HttpClient) {}

  createReminder(reminder: ReminderModel): Observable<ReminderModel> {
    return this._httpClient.post(`${environment.url}/reminders/create-reminder`, reminder);
  }

  updateReminder(id: string, reminder: ReminderModel): Observable<any> {
    return this._httpClient.put(`${environment.url}/reminders/update-reminder/${id}`, reminder);
  }

  deleteReminder(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.url}/reminders/delete-reminder/${id}`);
  }

  getPaginatedFilteredReminders(pageSize: number, pageIndex: number, query): Observable<FilteredReminders> {
    return this._httpClient.get<FilteredReminders>(`${environment.url}/reminders/filtered/${pageSize}/${pageIndex}`, { params: query });
  }

  getAllReminders(): Observable<ReminderModel[]> {
    return this._httpClient.get<ReminderModel[]>(`${environment.url}/reminders/get-all-reminders`);
  }
}
