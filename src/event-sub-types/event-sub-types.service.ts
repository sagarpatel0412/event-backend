import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventSubTypeInput } from './dto/create-event-sub-type.input';
import { UpdateEventSubTypeInput } from './dto/update-event-sub-type.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventSubTypesModel } from './model/event-sub-types.model';
import { Sequelize } from 'sequelize-typescript';
import { EventSubTypesCount } from './model/event-sub-types-count.model';
import { EventTypesModel } from 'src/event-types/model/event-types.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventSubTypesService {
  constructor(
    @InjectModel(EventSubTypesModel)
    private eventSubTypesModel: typeof EventSubTypesModel,
    private sequelize: Sequelize,
    @InjectModel(EventTypesModel)
    private eventTypesModel: typeof EventTypesModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
  ) {}

  public async createEventSubTypes(
    events: CreateEventSubTypeInput,
  ): Promise<EventSubTypesModel> {
    const event_types_data = await this.eventTypesModel.findOne({
      where: { value_info: events.event_type_value },
    });
    if (!event_types_data) {
      throw new NotFoundException(
        `${events.event_type_value} event type doesnt exist`,
      );
    } else {
      const getStatus = await this.dataStatusModel.findOne({
        where: { status_number: events.status_number },
      });
      if (!getStatus) {
        throw new NotFoundException(`${events.status_number} not found`);
      } else {
        const eventsModel = new EventSubTypesModel();
        eventsModel.name = events.name;
        eventsModel.value_info = events.value_info;
        eventsModel.description = events.description;
        eventsModel.title = events.title;
        eventsModel.image = events.image;
        eventsModel.meta_title = events.meta_title;
        eventsModel.meta_description = events.meta_description;
        eventsModel.status = events.status;
        eventsModel.eventTypesId = event_types_data.dataValues.id;
        eventsModel.status_id = getStatus.dataValues.id;

        const eventResults = await this.eventSubTypesModel.create(
          eventsModel.dataValues,
        );

        return eventResults;
      }
    }
  }

  public async updateEventSubTypes(
    id: string,
    events: UpdateEventSubTypeInput,
  ): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel.findOne({
      where: { id },
    });
    if (!eventsModel) {
      throw new NotFoundException(`${id} not found`);
    } else {
      eventsModel.name = events.name;
      eventsModel.value_info = events.value_info;
      eventsModel.description = events.description;
      eventsModel.title = events.title;
      eventsModel.image = events.image;
      eventsModel.meta_title = events.meta_title;
      eventsModel.meta_description = events.meta_description;
      eventsModel.status = events.status;

      await this.eventSubTypesModel.update(eventsModel.dataValues, {
        where: { id },
      });

      return eventsModel;
    }
  }

  public async deleteEventSubTypes(id: string): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel.findOne({
      where: { id },
    });
    if (!eventsModel) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventSubTypesModel.destroy({
        where: { id },
      });

      return eventsModel;
    }
  }

  public async getEventSubType(id: string): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel
      .scope([
        { method: ['event_types'] },
        { method: ['events_sub_types_events'] },
        { method: ['event_sub_types_status'] },
      ])
      .findOne({
        where: { id },
      });
    return eventsModel;
  }

  public async getEventSubTypes(): Promise<Array<EventSubTypesModel>> {
    const eventsModel = await this.eventSubTypesModel
      .scope([
        { method: ['event_types'] },
        { method: ['events_sub_types_events'] },
        { method: ['event_sub_types_status'] },
      ])
      .findAll();
    return eventsModel;
  }

  public async countEventSubTypes(): Promise<EventSubTypesCount> {
    const counts = await this.eventSubTypesModel.count();
    const eventCount = new EventSubTypesCount();
    eventCount.count = counts;
    return eventCount;
  }

  public async countEventSubTypesByEventTypes(
    eventTypesId: string,
  ): Promise<EventSubTypesCount> {
    const counts = await this.eventSubTypesModel.count({
      where: { eventTypesId },
    });
    const eventCount = new EventSubTypesCount();
    eventCount.count = counts;
    return eventCount;
  }
}
