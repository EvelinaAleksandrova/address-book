/* eslint-disable prettier/prettier */
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseReminderDto } from './response-reminder.dto';

@Exclude()
export class ResponseFilteredRemindersDto {
  @Expose()
  @Type(() => ResponseReminderDto)
  readonly filteredRecords: ResponseReminderDto[];

  @Expose()
  readonly count: number;
}
