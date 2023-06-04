/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ResponseConflictDto } from '../shared/dtos/response-conflict.dto';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dtos/response-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { FilterCategoriesDto } from './dtos/filter-categories.dto';
import { ResponseFilteredCategoriesDto } from './dtos/response-filtered-categories.dto';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  @HttpCode(HttpStatus.OK)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto | ResponseConflictDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get('filtered/:pageSize/:pageIndex')
  async getPaginatedFilteredCategories(
    @Param('pageSize', ParseIntPipe) pageSize: number,
    @Param('pageIndex', ParseIntPipe) pageIndex: number,
    @Query() query: FilterCategoriesDto,
  ): Promise<ResponseFilteredCategoriesDto> {
    return await this.categoryService.getPaginatedFilteredCategories(
      pageSize,
      pageIndex,
      query,
    );
  }

  @Get('get-all-categories')
  @HttpCode(HttpStatus.OK)
  async getAllCategories(): Promise<ResponseCategoryDto[]> {
    return await this.categoryService.getAllCategories();
  }

  @Put('update-category/:code')
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('code') code: string,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto | ResponseConflictDto> {
    return await this.categoryService.updateCategory(code, updateCategory);
  }

  @Delete('delete-category/:code')
  async deleteCategory(@Param('code') code: string): Promise<ResponseSuccessDTO> {
    return await this.categoryService.deleteCategory(code);
  }
}
