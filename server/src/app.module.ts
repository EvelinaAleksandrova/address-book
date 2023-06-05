import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { CategoryModule } from './categories/category.module';
import { RemindersModule } from './reminders/reminder.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://evelina:Yb8MaJFvlGTNkB7b@address-book.gvpdkze.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ContactsModule,
    CategoryModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
