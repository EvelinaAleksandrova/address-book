/* eslint-disable prettier/prettier */
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseCategoryDto } from './response-category.dto';

@Exclude()
export class ResponseFilteredCategoriesDto {
  @Expose()
  @Type(() => ResponseCategoryDto)
  readonly filteredRecords: ResponseCategoryDto[];

  @Expose()
  readonly count: number;
}
