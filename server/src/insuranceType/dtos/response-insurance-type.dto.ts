import { Exclude, Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

@Exclude()
export class ResponseInsuranceTypeDto {
  @Expose()
  @ApiResponseProperty()
  readonly code: string;

  @Expose()
  @ApiResponseProperty()
  readonly label: string;

  @Expose()
  @ApiResponseProperty()
  readonly isUsed: boolean;
}
