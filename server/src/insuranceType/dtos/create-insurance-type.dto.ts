import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInsuranceTypeDto {
  @IsNotEmpty({ message: 'Моля, въведете име на тип застраховане.' })
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @MaxLength(50, { message: 'Моля, въведете валидно име тип застраховане с по-малко от 50 символа.' })
  @ApiProperty()
  readonly label: string;
}
