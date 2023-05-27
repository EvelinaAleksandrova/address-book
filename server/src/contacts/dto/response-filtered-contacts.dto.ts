/* eslint-disable prettier/prettier */
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseContactDto } from './response-contact.dto';

@Exclude()
export class ResponseFilteredContactsDto {
  @Expose()
  @Type(() => ResponseContactDto)
  readonly filteredRecords: ResponseContactDto[];

  @Expose()
  readonly count: number;
}
