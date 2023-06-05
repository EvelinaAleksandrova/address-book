/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';
import { RemindersService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { ResponseFilteredRemindersDto } from './dto/response-filtered-reminder.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post('create-reminder')
  async createReminder(@Body() createReminderDto: CreateReminderDto) {
    return await this.remindersService.createReminder(createReminderDto);
  }

  @Get('filtered/:pageSize/:pageIndex')
  async getPaginatedFilteredReminders(
    @Param('pageSize', ParseIntPipe) pageSize: number,
    @Param('pageIndex', ParseIntPipe) pageIndex: number,
    @Query() query,
  ): Promise<ResponseFilteredRemindersDto> {
    return await this.remindersService.getPaginatedFilteredReminders(
      pageSize,
      pageIndex,
      query,
    );
  }

  @Put('update-reminder/:id')
  async updateReminder(
    @Param('id') id: string,
    @Body() updateReminderDto: CreateReminderDto,
  ): Promise<ResponseSuccessDTO> {
    return await this.remindersService.updateReminder(id, updateReminderDto);
  }

  @Delete('delete-reminder/:id')
  async deleteReminder(@Param('id') id: string): Promise<ResponseSuccessDTO> {
    return await this.remindersService.deleteReminder(id);
  }
}
