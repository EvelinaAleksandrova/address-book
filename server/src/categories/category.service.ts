/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import shortid = require('shortid');
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Messages } from '../shared/messages/message.model';
import { ResponseConflictDto } from '../shared/dtos/response-conflict.dto';
import { CategoryInterface } from './interface/category.interface';
import { ResponseCategoryDto } from './dtos/response-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ResponseFilteredCategoriesDto } from './dtos/response-filtered-categories.dto';
import { FilterCategoriesDto } from './dtos/filter-categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryInterface>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto | ResponseConflictDto> {
    try {
      const CategoryFound = await this.categoryModel.findOne({
        label: { $regex: `^${createCategoryDto.label}$`, $options: 'i' },
      });
      if (CategoryFound) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.ExistingCategory,
        });
      }

      const CategoryModel = new this.categoryModel({
        ...createCategoryDto,
        code: shortid.generate(),
      });

      const CategoryToSave = await CategoryModel.save();

      return plainToClass(ResponseCategoryDto, CategoryToSave);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllCategories(): Promise<ResponseCategoryDto[]> {
    try {
      const CategoryList = await this.categoryModel.find();
      return plainToClass(ResponseCategoryDto, CategoryList);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    try {
      const codeDuplicated = await this.categoryModel.findOne({
        label: { $regex: `^${updateCategoryDto.label}$`, $options: 'i' },
        code: { $ne: updateCategoryDto.code },
      });

      if (codeDuplicated) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.ExistingCategory,
        });
      }

      const CategoryUpdated = await this.categoryModel.updateOne(
        { code: updateCategoryDto.code },
        { $set: updateCategoryDto },
      );

      if (!CategoryUpdated) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.NonExistingCategory,
        });
      }

      return plainToClass(ResponseCategoryDto, {
        code: updateCategoryDto.code,
        label: updateCategoryDto.label,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async getPaginatedFilteredCategories(
    pageSize: number,
    pageIndex: number,
    queryParams,
  ): Promise<ResponseFilteredCategoriesDto> {
    try {
      const query = this.getQuery(queryParams);
      const sortOrder = -1;

      const categories = await this.categoryModel.aggregate([
        { $match: query },
        {
          $facet: {
            filteredRecords: [
              {
                $sort: { name: sortOrder },
              },
              {
                $skip: pageIndex * pageSize,
              },
              {
                $limit: pageSize,
              },
            ],
            recordsCount: [{ $count: 'count' }],
          },
        },
        {
          $unwind: '$recordsCount',
        },
        { $project: { filteredRecords: 1, count: '$recordsCount.count' } },
      ]);

      const res = categories?.length ? categories[0] : [];
      return plainToClass(ResponseFilteredCategoriesDto, res);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  private getQuery(queryParams: FilterCategoriesDto) {
    const query: any = {};
    for (const key in queryParams) {
      query[key] = { $regex: queryParams[key], $options: 'i' };
    }

    return query;
  }
}
