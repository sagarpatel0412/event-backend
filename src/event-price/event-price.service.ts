import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventPriceInput } from './dto/create-event-price.input';
import { UpdateEventPriceInput } from './dto/update-event-price.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventPriceModel } from './model/event-price.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventPriceService {
  constructor(
    @InjectModel(EventPriceModel)
    private eventPriceModel: typeof EventPriceModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventPrice(
    inputs: CreateEventPriceInput,
  ): Promise<EventPriceModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} doesnt exists`);
    } else {
      const priceInputs = new EventPriceModel();
      priceInputs.event_price = inputs.event_price;
      priceInputs.discount = inputs.discount;
      priceInputs.currency_code = inputs.currency_code;
      priceInputs.status = inputs.status;
      priceInputs.events_id = inputs.events_id;
      priceInputs.status_id = getStatus.dataValues.id;

      const priceResult = await this.eventPriceModel.create(
        priceInputs.dataValues,
      );

      return priceResult;
    }
  }

  public async updateEventPrice(
    id: string,
    inputs: UpdateEventPriceInput,
  ): Promise<EventPriceModel> {
    const priceFind = await this.eventPriceModel.findOne({ where: { id } });

    if (!priceFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      priceFind.event_price = inputs.event_price;
      priceFind.discount = inputs.discount;
      priceFind.currency_code = inputs.currency_code;
      priceFind.status = inputs.status;
      await this.eventPriceModel.update(priceFind.dataValues, {
        where: { id },
      });
      return priceFind;
    }
  }

  public async deleteEventPrice(id: string): Promise<EventPriceModel> {
    const priceFind = await this.eventPriceModel.findOne({ where: { id } });
    if (!priceFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventPriceModel.destroy({ where: { id } });
      return priceFind;
    }
  }

  public async getEventPrice(id: string): Promise<EventPriceModel> {
    const priceFind = await this.eventPriceModel
      .scope([{ method: ['events'] }, { method: ['event_price_status'] }])
      .findOne({ where: { id } });

    if (priceFind !== null) {
      return priceFind;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getEventPrices(): Promise<Array<EventPriceModel>> {
    const priceFind = await this.eventPriceModel
      .scope([{ method: ['events'] }, { method: ['event_price_status'] }])
      .findAll();
    return priceFind;
  }
}
