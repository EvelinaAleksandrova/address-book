/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { TypeSchema } from './schema/type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Type', schema: TypeSchema }])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [MongooseModule.forFeature([{ name: 'Type', schema: TypeSchema }])],
})
export class TypeModule {}
