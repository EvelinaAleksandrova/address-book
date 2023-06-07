/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';
import shortid = require('shortid');
import { Messages } from '../shared/messages/message.model';
import { ReminderInterface } from './interface/reminder.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { ResponseFilteredRemindersDto } from './dto/response-filtered-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel('Reminder')
    private readonly reminderModel: Model<ReminderInterface>,
  ) {}

  async createReminder(createReminderDto: CreateReminderDto) {
    const newReminder = new this.reminderModel({
      ...createReminderDto,
      idntfr: shortid.generate(),
      isReminderViewed: false,
    });
    await newReminder.save();
    return plainToClass(ResponseSuccessDTO, { message: '' });
  }

  async updateReminder(
    id: string,
    updateReminderDto: CreateReminderDto,
  ): Promise<ResponseSuccessDTO> {
    try {
      const reminder = await this.reminderModel.updateOne(
        { idntfr: id },
        { $set: updateReminderDto },
      );

      if (!reminder.modifiedCount) {
        throw new InternalServerErrorException(Messages.DefaultErrorMessage);
      }

      return { message: '' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteReminder(id: string): Promise<ResponseSuccessDTO> {
    try {
      const reminder = await this.reminderModel.deleteOne({ idntfr: id });

      if (!reminder.deletedCount) {
        throw new InternalServerErrorException(Messages.DefaultErrorMessage);
      }

      return { message: '' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getPaginatedFilteredReminders(
    pageSize: number,
    pageIndex: number,
    queryParams,
  ): Promise<ResponseFilteredRemindersDto> {
    try {
      const query = this.getQuery(queryParams);
      const sortOrder = -1;

      const reminders = await this.reminderModel.aggregate([
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

      const res = reminders?.length ? reminders[0] : [];
      return plainToClass(ResponseFilteredRemindersDto, res);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  private getQuery(queryParams) {
    const query: any = {};
    for (const key in queryParams) {
      query[key] = { $regex: queryParams[key], $options: 'i' };
    }

    return query;
  }
}
