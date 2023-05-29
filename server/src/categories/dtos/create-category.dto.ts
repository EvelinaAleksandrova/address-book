/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'Please, enter a valid category name of less than 50 characters.',
  })
  readonly label: string;
}
