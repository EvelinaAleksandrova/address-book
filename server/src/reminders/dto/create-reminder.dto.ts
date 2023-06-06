/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  readonly note: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly reminder: number;
}
