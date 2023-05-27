/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class FilterContactsDto {
  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly company: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly department: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly name: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly email: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly phone: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly note: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly type: string;

  @IsOptional()
  @IsString({ message: 'Моля, въведете валиден текстов формат.' })
  readonly address: string;
}
