import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import Boom = require('boom');
import { CreateInsuranceTypeDto } from './dtos/create-insurance-type.dto';
import { ResponseInsuranceTypeDto } from './dtos/response-insurance-type.dto';
import { UpdateInsuranceTypeDto } from './dtos/update-insurance-type.dto';
import { InsuranceTypeService } from './insurance-type.service';

@Controller('insurance-type')
@ApiBearerAuth()
export class InsuranceTypeController {
  constructor(private readonly insuranceTypeService: InsuranceTypeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createInsuranceType(@Req() req, @Body() createInsuranceTypeDto: CreateInsuranceTypeDto): Promise<ResponseInsuranceTypeDto | Boom> {
    return await this.insuranceTypeService.createInsuranceType(createInsuranceTypeDto, req.user);
  }

  @Get('get-all-insurance-types')
  @HttpCode(HttpStatus.OK)
  async getAllInsuranceTypes(@Req() req): Promise<ResponseInsuranceTypeDto[]> {
    return await this.insuranceTypeService.getAllInsuranceTypes(req.user);
  }

  @Put('update-insurance-type')
  @HttpCode(HttpStatus.OK)
  async updateInsuranceType(@Body() updateInsuranceType: UpdateInsuranceTypeDto, @Req() req): Promise<ResponseInsuranceTypeDto | Boom> {
    return await this.insuranceTypeService.updateInsuranceType(updateInsuranceType, req.user);
  }
}
