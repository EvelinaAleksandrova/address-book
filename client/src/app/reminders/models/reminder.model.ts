export interface ReminderModel {
  id?: string;
  contact?: string;
  reminder?: number;
  date?: Date;
  note?: String;
  isEventViewed?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
