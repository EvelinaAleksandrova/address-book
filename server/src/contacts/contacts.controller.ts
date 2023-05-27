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

  @Get()
  getAllContacts() {
    return this.contactsService.getContacts();
  }

  @Get(':id')
  getContact(@Param('id') prodId: string) {
    return this.contactsService.getSingleContact(prodId);
  }

  @Put(':id')
  updateContact() {
    this.contactsService.updateContact();
    return null;
  }

  @Delete(':id')
  removeContact(@Param('id') prodId: string) {
    this.contactsService.deleteContact(prodId);
    return null;
  }
}
