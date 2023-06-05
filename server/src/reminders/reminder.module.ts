/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemindersService } from './reminder.service';
import { ReminderSchema } from './schema/reminder.schema';
import { RemindersController } from './reminder.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reminder', schema: ReminderSchema}]),
  ],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}