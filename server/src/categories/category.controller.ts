/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ResponseConflictDto } from '../shared/dtos/response-conflict.dto';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dtos/response-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto | ResponseConflictDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get('get-all-categories')
  @HttpCode(HttpStatus.OK)
  async getAllCategories(): Promise<ResponseCategoryDto[]> {
    return await this.categoryService.getAllCategories();
  }

  @Put('update-category')
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto | ResponseConflictDto> {
    return await this.categoryService.updateCategory(updateCategory);
  }
}
