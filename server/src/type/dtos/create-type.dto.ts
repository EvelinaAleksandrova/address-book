/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty({ message: 'Моля, въведете име на тип.' })
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @MaxLength(50, {
    message: 'Моля, въведете валидно име тип с по-малко от 50 символа.',
  })
  readonly label: string;
}
