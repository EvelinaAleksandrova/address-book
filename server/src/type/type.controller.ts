/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ResponseTypeDto } from './dtos/response-type.dto';
import { CreateTypeDto } from './dtos/create-type.dto';
import { UpdateTypeDto } from './dtos/update-type.dto';
import { TypeService } from './type.service';
import { ResponseConflictDto } from '../shared/dtos/response-conflict.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createType(
    @Body() createTypeDto: CreateTypeDto,
  ): Promise<ResponseTypeDto | ResponseConflictDto> {
    return await this.typeService.createType(createTypeDto);
  }

  @Get('get-all-types')
  @HttpCode(HttpStatus.OK)
  async getAllTypes(): Promise<ResponseTypeDto[]> {
    return await this.typeService.getAllTypes();
  }

  @Put('update-type')
  @HttpCode(HttpStatus.OK)
  async updateType(
    @Body() updateType: UpdateTypeDto,
  ): Promise<ResponseTypeDto | ResponseConflictDto> {
    return await this.typeService.updateType(updateType);
  }
}
