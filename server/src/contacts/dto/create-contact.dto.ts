/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly company: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат за отдел.' })
  readonly department: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат за име.' })
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @MaxLength(1500, {
    message: 'Моля въведете по-малко от 1000 символа за пояснение.',
  })
  readonly note: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}
