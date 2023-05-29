/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import shortid = require('shortid');
import { TypeInterface } from './interface/type.interface';
import { CreateTypeDto } from './dtos/create-type.dto';
import { ResponseTypeDto } from './dtos/response-type.dto';
import { Messages } from '../shared/messages/message.model';
import { UpdateTypeDto } from './dtos/update-type.dto';
import { ResponseConflictDto } from '../shared/dtos/response-conflict.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel('Type') private readonly typeModel: Model<TypeInterface>,
  ) {}

  async createType(
    createTypeDto: CreateTypeDto,
  ): Promise<ResponseTypeDto | ResponseConflictDto> {
    try {
      const typeFound = await this.typeModel.findOne({
        label: { $regex: `^${createTypeDto.label}$`, $options: 'i' },
      });
      if (typeFound) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.ExistingType,
        });
      }

      const typeModel = new this.typeModel({
        ...createTypeDto,
        code: shortid.generate(),
      });

      const typeToSave = await typeModel.save();

      return plainToClass(ResponseTypeDto, typeToSave);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllTypes(): Promise<ResponseTypeDto[]> {
    try {
      const typeList = await this.typeModel.find();
      return plainToClass(ResponseTypeDto, typeList);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateType(updateTypeDto: UpdateTypeDto) {
    try {
      const codeDuplicated = await this.typeModel.findOne({
        label: { $regex: `^${updateTypeDto.label}$`, $options: 'i' },
        code: { $ne: updateTypeDto.code },
      });

      if (codeDuplicated) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.ExistingType,
        });
      }

      const typeUpdated = await this.typeModel.updateOne(
        { code: updateTypeDto.code },
        { $set: updateTypeDto },
      );

      if (!typeUpdated) {
        return plainToClass(ResponseConflictDto, {
          message: Messages.NonExistingType,
        });
      }

      return plainToClass(ResponseTypeDto, {
        code: updateTypeDto.code,
        label: updateTypeDto.label,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
