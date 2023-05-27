/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseSuccessDTO {
  @Expose()
  readonly message: string;
}
