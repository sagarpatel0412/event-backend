import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventCityInput } from './dto/create-event-city.input';
import { UpdateEventCityInput } from './dto/update-event-city.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventCityModel } from './model/event-city.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventCityService {
  constructor(
    @InjectModel(EventCityModel) private eventCityModel: typeof EventCityModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventCity(
    inputs: CreateEventCityInput,
  ): Promise<EventCityModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} doesnt exists`);
    } else {
      const cityInput = new EventCityModel();
      cityInput.event_time = inputs.event_time;
      cityInput.event_date = inputs.event_date;
      cityInput.city = inputs.city;
      cityInput.country = inputs.country;
      cityInput.state = inputs.state;
      cityInput.address = inputs.address;
      cityInput.cost = inputs.cost;
      cityInput.terms_condition = inputs.terms_condition;
      cityInput.description = inputs.description;
      cityInput.status = inputs.status;
      cityInput.contact = inputs.contact;
      cityInput.longitude = inputs.longitude;
      cityInput.latitude = inputs.latitude;
      cityInput.pincode = inputs.pincode;
      cityInput.currency_code = inputs.currency_code;
      cityInput.events_id = inputs.events_id;
      cityInput.status_id = getStatus.dataValues.id;

      const cityResult = await this.eventCityModel.create(cityInput.dataValues);
      return cityResult;
    }
  }

  public async updateEventCity(
    id: string,
    inputs: UpdateEventCityInput,
  ): Promise<EventCityModel> {
    const cityFind = await this.eventCityModel.findOne({ where: { id } });
    if (!cityFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      cityFind.event_time = inputs.event_time;
      cityFind.event_date = inputs.event_date;
      cityFind.city = inputs.city;
      cityFind.country = inputs.country;
      cityFind.state = inputs.state;
      cityFind.address = inputs.address;
      cityFind.cost = inputs.cost;
      cityFind.terms_condition = inputs.terms_condition;
      cityFind.description = inputs.description;
      cityFind.status = inputs.status;
      cityFind.contact = inputs.contact;
      cityFind.longitude = inputs.longitude;
      cityFind.latitude = inputs.latitude;
      cityFind.pincode = inputs.pincode;
      cityFind.currency_code = inputs.currency_code;

      await this.eventCityModel.update(cityFind.dataValues, { where: { id } });
      return cityFind;
    }
  }

  public async deleteEventCity(id: string): Promise<EventCityModel> {
    const cityFind = await this.eventCityModel.findOne({ where: { id } });
    if (!cityFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventCityModel.destroy({ where: { id } });
      return cityFind;
    }
  }

  public async getEventCity(id: string): Promise<EventCityModel> {
    const cityFind = await this.eventCityModel
      .scope([{ method: ['events'] }, { method: ['event_city_status'] }])
      .findOne({ where: { id } });
    if (cityFind !== null) {
      return cityFind;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getEventCities(): Promise<Array<EventCityModel>> {
    const cityFind = await this.eventCityModel
      .scope([{ method: ['events'] }, { method: ['event_city_status'] }])
      .findAll();
    return cityFind;
  }
}
