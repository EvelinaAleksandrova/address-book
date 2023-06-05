/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;
}
