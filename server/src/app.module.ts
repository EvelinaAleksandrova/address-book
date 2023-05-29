import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://evelina:Yb8MaJFvlGTNkB7b@address-book.gvpdkze.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ContactsModule,
    TypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
