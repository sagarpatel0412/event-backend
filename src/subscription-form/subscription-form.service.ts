import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionFormInput } from './dto/create-subscription-form.input';
import { UpdateSubscriptionFormInput } from './dto/update-subscription-form.input';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionFormModel } from './model/subscription-form.model';
import { Sequelize } from 'sequelize-typescript';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { emailTemplateOne, emailTemplateTwo } from './subscription.essentials';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class SubscriptionFormService {
  constructor(
    @InjectModel(SubscriptionFormModel)
    private subscriptionFormModel: typeof SubscriptionFormModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async createSubscription(
    inputs: CreateSubscriptionFormInput,
  ): Promise<SubscriptionFormModel> {
    const isEmailThere = await this.subscriptionFormModel.findOne({
      where: { email: this.normalizeEmail(inputs.email) },
    });
    if (isEmailThere) {
      throw new ConflictException(`email already exists`);
    } else {
      const getStatus = await this.dataStatusModel.findOne({
        where: { status_number: inputs.status_number },
      });
      if (!getStatus) {
        throw new NotFoundException(`${inputs.status_number} doesnt exists`);
      } else {
        const dataEntry = new SubscriptionFormModel();
        dataEntry.email = inputs.email;
        dataEntry.status = inputs.status;
        dataEntry.is_sent_email = inputs.is_email_sent;
        dataEntry.status_id = getStatus.dataValues.id;
        const dataSent = await this.subscriptionFormModel.create(
          dataEntry.dataValues,
        );
        if (dataSent) {
          this.sendMail(inputs.email);
        }
        return dataSent;
      }
    }
  }

  public async updateSubscription(
    id: string,
    inputs: UpdateSubscriptionFormInput,
  ): Promise<SubscriptionFormModel> {
    const isEmailThere = await this.subscriptionFormModel.findOne({
      where: { id },
    });
    if (!isEmailThere) {
      throw new NotFoundException(`email already exists`);
    } else {
      isEmailThere.email = this.normalizeEmail(inputs.email);
      isEmailThere.status = inputs.status;
      isEmailThere.is_sent_email = inputs.is_email_sent;
      await this.subscriptionFormModel.update(isEmailThere.dataValues, {
        where: { id },
      });
      return isEmailThere;
    }
  }

  public async deleteSubscription(id: string): Promise<SubscriptionFormModel> {
    const isEmailThere = await this.subscriptionFormModel.findOne({
      where: { id },
    });
    if (!isEmailThere) {
      throw new NotFoundException(`email already exists`);
    } else {
      await this.subscriptionFormModel.destroy({
        where: { id },
      });
      return isEmailThere;
    }
  }

  public async getSubscription(id: string): Promise<SubscriptionFormModel> {
    const dataSent = await this.subscriptionFormModel
      .scope([{ method: ['subscription_form_status'] }])
      .findOne({
        where: { id },
      });
    if (dataSent === null) {
      throw new NotFoundException(`no data foubd`);
    } else {
      return dataSent;
    }
  }

  public async getSubscriptions(): Promise<Array<SubscriptionFormModel>> {
    const dataSent = await this.subscriptionFormModel
      .scope([{ method: ['subscription_form_status'] }])
      .findAll();
    return dataSent;
  }

  public async sendMail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      subject: 'Subscription Mail',
      html: emailTemplateTwo(email),
    });
  }

  public async sendSubMail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      subject: 'Subscription Mail',
      html: emailTemplateOne(email),
    });
  }

  public normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async cronMessages(): Promise<void> {
    const mailSenderList = await this.subscriptionFormModel
      .scope([{ method: ['subscription_form_status'] }])
      .findAll();
    mailSenderList.map(async (i: any) => {
      await this.sendSubMail(i.dataValues.email);
    });
  }
}
