export interface ReminderModel {
  id?: string;
  contact?: string;
  reminder?: number;
  date?: Date;
  time?: string;
  note?: String;
  isEventViewed?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
