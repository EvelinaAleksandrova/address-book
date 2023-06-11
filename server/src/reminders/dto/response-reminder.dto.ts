/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseReminderDto {
  @Expose({ name: 'idntfr' })
  readonly id: string;

  @Expose()
  readonly contact: string;

  @Expose()
  readonly date: Date;

  @Expose()
  readonly time: string;

  @Expose()
  readonly reminder: number;

  @Expose()
  readonly note: string;

  @Expose()
  readonly category: string;

  @Expose()
  readonly isEventViewed: boolean;
}
