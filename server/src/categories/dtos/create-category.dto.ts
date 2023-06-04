/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'Please, enter a valid category name of less than 50 characters.',
  })
  readonly label: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500, {
    message: 'Please, enter a valid note of less than 1500 characters.',
  })
  readonly note: string;
}
