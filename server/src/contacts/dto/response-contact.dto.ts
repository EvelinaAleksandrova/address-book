/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseContactDto {
  @Expose({ name: 'idntfr' })
  readonly id: string;

  @Expose()
  readonly company: string;

  @Expose()
  readonly department: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly note: string;

  @Expose()
  readonly category: string;

  @Expose()
  readonly address: string;
}
