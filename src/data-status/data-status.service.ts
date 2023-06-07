import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDataStatusInput } from './dto/create-data-status.input';
import { UpdateDataStatusInput } from './dto/update-data-status.input';
import { InjectModel } from '@nestjs/sequelize';
import { DataStatusModel } from './model/data-status.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DataStatusService {
  constructor(
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createDataStatus(
    inputs: CreateDataStatusInput,
  ): Promise<DataStatusModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (getStatus) {
      throw new ConflictException(`${inputs.status_number} already there`);
    } else {
      const statusEntry = new DataStatusModel();
      statusEntry.status_number = inputs.status_number;
      statusEntry.description = inputs.description;
      statusEntry.value_info = inputs.value_info;
      statusEntry.title = inputs.title;
      statusEntry.status = inputs.status;
      const statusResult = await this.dataStatusModel.create(
        statusEntry.dataValues,
      );
      return statusResult;
    }
  }

  public async updateDataStatus(
    id: string,
    inputs: UpdateDataStatusInput,
  ): Promise<DataStatusModel> {
    const getStatus = await this.dataStatusModel.findOne({ where: { id } });
    if (!getStatus) {
      throw new NotFoundException(`${id} not found`);
    } else {
      getStatus.status_number = inputs.status_number;
      getStatus.description = inputs.description;
      getStatus.value_info = inputs.value_info;
      getStatus.title = inputs.title;
      getStatus.status = inputs.status;
      await this.dataStatusModel.update(getStatus.dataValues, {
        where: { id },
      });
      return getStatus;
    }
  }

  public async deleteDataStatus(id: string): Promise<DataStatusModel> {
    const getStatus = await this.dataStatusModel.findOne({ where: { id } });
    if (!getStatus) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.dataStatusModel.destroy({ where: { id } });
      return getStatus;
    }
  }

  public async getDataStatus(id: string): Promise<DataStatusModel> {
    const getStatus = await this.dataStatusModel
      .scope([
        { method: ['users'] },
        { method: ['posts'] },
        { method: ['user_roles'] },
        { method: ['post_likes'] },
        { method: ['post_comments'] },
        { method: ['events'] },
        { method: ['event_types'] },
        { method: ['event_sub_types'] },
        { method: ['event_ratings'] },
        { method: ['event_feedbacks'] },
        { method: ['contact_forms'] },
        { method: ['subscription_forms'] },
        { method: ['event_cities'] },
        { method: ['event_prices'] },
        { method: ['event_services'] },
        { method: ['event_images'] },
      ])
      .findOne({ where: { id } });
    if (getStatus !== null) {
      return getStatus;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getDataStatuses(): Promise<Array<DataStatusModel>> {
    const getStatus = await this.dataStatusModel
      .scope([
        { method: ['users'] },
        { method: ['posts'] },
        { method: ['user_roles'] },
        { method: ['post_likes'] },
        { method: ['post_comments'] },
        { method: ['events'] },
        { method: ['event_types'] },
        { method: ['event_sub_types'] },
        { method: ['event_ratings'] },
        { method: ['event_feedbacks'] },
        { method: ['contact_forms'] },
        { method: ['subscription_forms'] },
        { method: ['event_cities'] },
        { method: ['event_prices'] },
        { method: ['event_services'] },
        { method: ['event_images'] },
      ])
      .findAll();
    return getStatus;
  }
}
