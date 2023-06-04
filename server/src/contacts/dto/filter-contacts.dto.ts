/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class FilterContactsDto {
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
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly note: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}
