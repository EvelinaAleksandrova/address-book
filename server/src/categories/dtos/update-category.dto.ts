/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: 'Please, enter a valid category name of less than 50 characters.',
  })
  readonly label: string;
}
