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

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<CategoryInterface>,
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
}
