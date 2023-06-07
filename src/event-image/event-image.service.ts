import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventImageInput } from './dto/create-event-image.input';
import { UpdateEventImageInput } from './dto/update-event-image.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventImageModel } from './model/event-image.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventImageService {
  constructor(
    @InjectModel(EventImageModel)
    private eventImageModel: typeof EventImageModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventImage(
    inputs: CreateEventImageInput,
  ): Promise<EventImageModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} doesnt exists`);
    } else {
      const imageInput = new EventImageModel();
      imageInput.image = inputs.image;
      imageInput.status = inputs.status;
      imageInput.events_id = inputs.events_id;
      imageInput.status_id = getStatus.dataValues.id;
      const imageResult = await this.eventImageModel.create(
        imageInput.dataValues,
      );
      return imageResult;
    }
  }

  public async updateEventImage(
    id: string,
    inputs: UpdateEventImageInput,
  ): Promise<EventImageModel> {
    const imageFind = await this.eventImageModel.findOne({ where: { id } });
    if (!imageFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      imageFind.image = inputs.image;
      imageFind.status = inputs.status;
      await this.eventImageModel.update(imageFind.dataValues, {
        where: { id },
      });
      return imageFind;
    }
  }

  public async deleteEventImage(id: string): Promise<EventImageModel> {
    const imageFind = await this.eventImageModel.findOne({ where: { id } });
    if (!imageFind) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventImageModel.destroy({
        where: { id },
      });
      return imageFind;
    }
  }

  public async getEventImage(id: string): Promise<EventImageModel> {
    const imageFind = await this.eventImageModel
      .scope([{ method: ['events'] }, { method: ['event_image_status'] }])
      .findOne({ where: { id } });
    if (imageFind !== null) {
      return imageFind;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getEventImages(): Promise<Array<EventImageModel>> {
    const imageFind = await this.eventImageModel
      .scope([{ method: ['events'] }, { method: ['event_image_status'] }])
      .findAll();
    return imageFind;
  }
}
