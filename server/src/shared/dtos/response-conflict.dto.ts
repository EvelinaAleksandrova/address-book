/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseConflictDto {
  @Expose()
  readonly message: string;
}
