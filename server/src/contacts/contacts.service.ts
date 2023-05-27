/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactInterface } from './interface/contact.interface';
import { CreateContactDto } from './dto/create-contact.dto';
import { plainToClass } from 'class-transformer';
import { ResponseSuccessDTO } from '../shared/dtos/response-success.dto';
import { ResponseFilteredContactsDto } from './dto/response-filtered-contacts.dto';
import { FilterContactsDto } from './dto/filter-contacts.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact')
    private readonly contactModel: Model<ContactInterface>,
  ) {}

  async createContact(createContactDto: CreateContactDto) {
    const newContact = new this.contactModel(createContactDto);
    await newContact.save();
    return plainToClass(ResponseSuccessDTO, { message: '' });
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

  async getContacts() {
    const Contacts = await this.contactModel.find().exec();
    return Contacts.map((prod) => ({}));
  }

  async getSingleContact(ContactId: string) {
    const Contact = await this.findContact(ContactId);
    return {};
  }

  async updateContact() {
    // const updatedContact = await this.findContact();
    // if (title) {
    //   updatedContact.title = title;
    // }
    // updatedContact.save();
  }

  async deleteContact(prodId: string) {
    const result: any = await this.contactModel
      .deleteOne({ _id: prodId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Contact.');
    }
  }

  private async findContact(id: string): Promise<ContactInterface> {
    let Contact;
    try {
      Contact = await this.contactModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Contact.');
    }
    if (!Contact) {
      throw new NotFoundException('Could not find Contact.');
    }
    return Contact;
  }
}
