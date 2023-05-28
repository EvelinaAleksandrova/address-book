import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Boom = require('boom');
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import shortid = require('shortid');
import { Messages } from '../shared/messages/messages.model';
import { CreateInsuranceTypeDto } from './dtos/create-insurance-type.dto';
import { ResponseInsuranceTypeDto } from './dtos/response-insurance-type.dto';
import { UpdateInsuranceTypeDto } from './dtos/update-insurance-type.dto';
import { InsuranceTypeInterface } from './interface/insurance-type.interface';

@Injectable()
export class InsuranceTypeService {
  constructor(@InjectModel('InsuranceType') private readonly InsuranceTypeModel: Model<InsuranceTypeInterface>) {}

  async createInsuranceType(createInsuranceTypeDto: CreateInsuranceTypeDto, user): Promise<ResponseInsuranceTypeDto | Boom> {
    try {
      const insuranceTypeFound = await this.InsuranceTypeModel.findOne({
        label: { $regex: `^${createInsuranceTypeDto.label}$`, $options: 'i' },
        adminId: user.adminId
      });
      if (insuranceTypeFound) {
        return Boom.conflict(Messages.ExistingInsuranceType);
      }

      const insuranceTypeModel = new this.InsuranceTypeModel({
        ...createInsuranceTypeDto,
        code: shortid.generate(),
        adminId: user.adminId,
        createdBy: user.id
      });

      const insuranceTypeToSave = await insuranceTypeModel.save();

      return plainToClass(ResponseInsuranceTypeDto, insuranceTypeToSave);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllInsuranceTypes(user): Promise<ResponseInsuranceTypeDto[]> {
    try {
      const insuranceTypeList = await this.InsuranceTypeModel.find({ adminId: user.adminId });
      return plainToClass(ResponseInsuranceTypeDto, insuranceTypeList);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateInsuranceType(updateInsuranceTypeDto: UpdateInsuranceTypeDto, user) {
    try {
      const codeDuplicated = await this.InsuranceTypeModel.findOne({
        label: { $regex: `^${updateInsuranceTypeDto.label}$`, $options: 'i' },
        code: { $ne: updateInsuranceTypeDto.code },
        adminId: user.adminId
      });

      if (codeDuplicated) {
        return Boom.conflict(Messages.ExistingInsuranceType);
      }

      let insuranceTypeUpdated = await this.InsuranceTypeModel.updateOne(
        { code: updateInsuranceTypeDto.code, adminId: user.adminId },
        { $set: updateInsuranceTypeDto }
      );

      if (!insuranceTypeUpdated) {
        return Boom.badRequest(Messages.NonExistingInsuranceType);
      }

      return plainToClass(ResponseInsuranceTypeDto, { code: updateInsuranceTypeDto.code, label: updateInsuranceTypeDto.label });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
