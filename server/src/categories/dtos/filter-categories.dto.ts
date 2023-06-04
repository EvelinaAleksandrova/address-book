/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class FilterCategoriesDto {
  @IsOptional()
  @IsString()
  readonly label: string;
}
