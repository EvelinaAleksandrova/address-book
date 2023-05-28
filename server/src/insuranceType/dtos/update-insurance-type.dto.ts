import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInsuranceTypeDto {
  @IsNotEmpty()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @ApiProperty()
  readonly code: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  @MaxLength(50, { message: 'Моля, въведете валидно име на тип застраховане с по-малко от 50 символа.' })
  @ApiProperty()
  readonly label: string;
}
