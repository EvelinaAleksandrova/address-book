/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  readonly company: string;

  @IsOptional()
  @IsString()
  readonly department: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  readonly note: string;

  @IsOptional()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}
