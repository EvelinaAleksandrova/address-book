/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';
import { CategoryController } from './category.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
})
export class CategoryModule {}
