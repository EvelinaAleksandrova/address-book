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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { FilterContactsDto } from './dto/filter-contacts.dto';
import { ResponseFilteredContactsDto } from './dto/response-filtered-contacts.dto';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('create-contact')
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.createContact(createContactDto);
  }

  @Get('filtered/:pageSize/:pageIndex')
  async getPaginatedFilteredContacts(
    @Param('pageSize', ParseIntPipe) pageSize: number,
    @Param('pageIndex', ParseIntPipe) pageIndex: number,
    @Query() query: FilterContactsDto,
  ): Promise<ResponseFilteredContactsDto> {
    return await this.contactsService.getPaginatedFilteredContacts(
      pageSize,
      pageIndex,
      query,
    );
  }

  @Put('update-contact/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: CreateContactDto,
  ): Promise<ResponseSuccessDTO> {
    return await this.contactsService.updateContact(id, updateContactDto);
  }

  @Delete('delete-contact/:id')
  async deleteContact(@Param('id') id: string): Promise<ResponseSuccessDTO> {
    return await this.contactsService.deleteContact(id);
  }

  // @Get()
  // getAllContacts() {
  //   return this.contactsService.getContacts();
  // }
}
