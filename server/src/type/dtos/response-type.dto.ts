/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseTypeDto {
  @Expose()
  readonly code: string;

  @Expose()
  readonly label: string;

}
