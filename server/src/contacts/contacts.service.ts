/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactInterface } from './interface/contact.interface';
import { CreateContactDto } from './dto/create-contact.dto';
import { plainToClass } from 'class-transformer';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';
import { ResponseFilteredContactsDto } from './dto/response-filtered-contacts.dto';
import { FilterContactsDto } from './dto/filter-contacts.dto';
import shortid = require('shortid');
import { Messages } from '../shared/messages/message.model';
import { ResponseContactDto } from './dto/response-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact')
    private readonly contactModel: Model<ContactInterface>,
  ) {}

  async createContact(createContactDto: CreateContactDto) {
    const newContact = new this.contactModel({
      ...createContactDto,
      idntfr: shortid.generate(),
    });
    await newContact.save();
    return plainToClass(ResponseSuccessDTO, { message: '' });
  }

  async updateContact(
    id: string,
    updateContactDto: CreateContactDto,
  ): Promise<ResponseSuccessDTO> {
    try {
      const Contact = await this.contactModel.updateOne(
        { idntfr: id },
        { $set: updateContactDto },
      );

      if (!Contact.modifiedCount) {
        throw new InternalServerErrorException(Messages.DefaultErrorMessage);
      }

      return { message: '' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteContact(id: string): Promise<ResponseSuccessDTO> {
    try {
      const contact = await this.contactModel.deleteOne({ idntfr: id });

      if (!contact.deletedCount) {
        throw new InternalServerErrorException(Messages.DefaultErrorMessage);
      }

      return { message: '' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllContacts(): Promise<ResponseContactDto[]> {
    const contacts = await this.contactModel.find();
    return plainToClass(ResponseContactDto, contacts);
  }

  async getPaginatedFilteredContacts(
    pageSize: number,
    pageIndex: number,
    queryParams,
  ): Promise<ResponseFilteredContactsDto> {
    try {
      const query = this.getQuery(queryParams);
      const sortOrder = -1;

      const contacts = await this.contactModel.aggregate([
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

      const res = contacts?.length ? contacts[0] : [];
      return plainToClass(ResponseFilteredContactsDto, res);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  private getQuery(queryParams: FilterContactsDto) {
    const query: any = {};
    for (const key in queryParams) {
      query[key] = { $regex: queryParams[key], $options: 'i' };
    }

    return query;
  }
}
