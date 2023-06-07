import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventServiceInput } from './dto/create-event-service.input';
import { UpdateEventServiceInput } from './dto/update-event-service.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventServiceModel } from './model/event-service.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventServiceService {
  constructor(
    @InjectModel(EventServiceModel)
    private eventServiceModel: typeof EventServiceModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventService(
    inputs: CreateEventServiceInput,
  ): Promise<EventServiceModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} doesnt exists`);
    } else {
      const serviceInput = new EventServiceModel();
      serviceInput.title = inputs.title;
      serviceInput.description = inputs.description;
      serviceInput.service_description = inputs.service_description;
      serviceInput.cost = inputs.cost;
      serviceInput.city = inputs.city;
      serviceInput.status = inputs.status;
      serviceInput.currency_code = inputs.currency_code;
      serviceInput.events_id = inputs.events_id;
      serviceInput.status_id = getStatus.dataValues.id;
      const serviceResult = await this.eventServiceModel.create(
        serviceInput.dataValues,
      );
      return serviceResult;
    }
  }

  public async updateEventService(
    id: string,
    inputs: UpdateEventServiceInput,
  ): Promise<EventServiceModel> {
    const serviceFind = await this.eventServiceModel.findOne({ where: { id } });
    if (!serviceFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      serviceFind.title = inputs.title;
      serviceFind.description = inputs.description;
      serviceFind.service_description = inputs.service_description;
      serviceFind.cost = inputs.cost;
      serviceFind.city = inputs.city;
      serviceFind.status = inputs.status;
      serviceFind.currency_code = inputs.currency_code;
      await this.eventServiceModel.update(serviceFind.dataValues, {
        where: { id },
      });
      return serviceFind;
    }
  }

  public async deleteEventService(id: string): Promise<EventServiceModel> {
    const serviceFind = await this.eventServiceModel.findOne({ where: { id } });
    if (!serviceFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventServiceModel.destroy({
        where: { id },
      });
      return serviceFind;
    }
  }

  public async getEventService(id: string): Promise<EventServiceModel> {
    const serviceFind = await this.eventServiceModel
      .scope([{ method: ['events'] }, { method: ['event_service_status'] }])
      .findOne({ where: { id } });
    if (serviceFind !== null) {
      return serviceFind;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getEventServices(): Promise<Array<EventServiceModel>> {
    const serviceFind = await this.eventServiceModel
      .scope([{ method: ['events'] }, { method: ['event_service_status'] }])
      .findAll();
    return serviceFind;
  }
}
