/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTypeDto {
  @IsNotEmpty()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly code: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @MaxLength(50, {
    message: 'Моля, въведете валидно име на тип с по-малко от 50 символа.',
  })
  readonly label: string;
}
