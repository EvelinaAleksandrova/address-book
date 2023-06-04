/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseCategoryDto {
  @Expose({ name: 'idntfr' })
  readonly id: string;

  @Expose()
  readonly code: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly isSpecial: boolean;
}
