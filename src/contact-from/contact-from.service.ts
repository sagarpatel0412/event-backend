import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactFromInput } from './dto/create-contact-from.input';
import { UpdateContactFromInput } from './dto/update-contact-from.input';
import { InjectModel } from '@nestjs/sequelize';
import { ContactFormModel } from './model/contact-form.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class ContactFromService {
  constructor(
    @InjectModel(ContactFormModel)
    private contactFormModel: typeof ContactFormModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createContactForm(
    inputs: CreateContactFromInput,
  ): Promise<ContactFormModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} not found`);
    } else {
      const contacts = new ContactFormModel();
      contacts.name = inputs.name;
      contacts.description = inputs.description;
      contacts.title = inputs.title;
      contacts.email = inputs.email;
      contacts.status = inputs.status;
      contacts.status_id = getStatus.dataValues.id;

      const contactResults = await this.contactFormModel.create(
        contacts.dataValues,
      );
      return contactResults;
    }
  }

  public async updateContactForm(
    id: string,
    inputs: UpdateContactFromInput,
  ): Promise<ContactFormModel> {
    const getContact = await this.contactFormModel.findOne({ where: { id } });

    if (!getContact) {
      throw new NotFoundException(`${id} not found`);
    } else {
      // const contacts = new ContactFormModel();
      getContact.name = inputs.name;
      getContact.description = inputs.description;
      getContact.title = inputs.title;
      getContact.email = inputs.email;
      getContact.status = inputs.status;

      await this.contactFormModel.update(getContact.dataValues, {
        where: { id },
      });
      return getContact;
    }
  }

  public async deleteContactForm(id: string): Promise<ContactFormModel> {
    const getContact = await this.contactFormModel.findOne({
      where: { id },
    });
    if (!getContact) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.contactFormModel.destroy({
        where: { id },
      });

      return getContact;
    }
  }

  public async getContactForm(id: string): Promise<ContactFormModel> {
    const getContact = await this.contactFormModel
      .scope([{ method: ['contact_form_status'] }])
      .findOne({ where: { id } });
    if (getContact === null) {
      throw new NotFoundException(`no data`);
    } else {
      return getContact;
    }
  }

  public async getContactForms(): Promise<Array<ContactFormModel>> {
    const getContact = await this.contactFormModel
      .scope([{ method: ['contact_form_status'] }])
      .findAll();
    return getContact;
  }
}
