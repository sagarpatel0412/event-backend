import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventsFeedbackInput } from './dto/create-events-feedback.input';
import { UpdateEventsFeedbackInput } from './dto/update-events-feedback.input';
import { EventsFeedbackModel } from './model/events-feedback.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { Sequelize } from 'sequelize-typescript';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class EventsFeedbackService {
  constructor(
    @InjectModel(EventsFeedbackModel)
    private eventsFeedbackModel: typeof EventsFeedbackModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(EventsModel) private eventsModel: typeof EventsModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventsFeedback(
    feedback: CreateEventsFeedbackInput,
  ): Promise<EventsFeedbackModel> {
    const userData = await this.userModel.findOne({
      where: { id: feedback.user_id },
    });
    if (!userData) {
      throw new NotFoundException(
        `user with this id ${feedback.user_id} doesnt exists`,
      );
    } else {
      const eventData = await this.eventsModel.findOne({
        where: { id: feedback.event_id },
      });
      if (!eventData) {
        throw new NotFoundException(
          `event with this id ${feedback.event_id} doesnt exists`,
        );
      } else {
        const getStatus = await this.dataStatusModel.findOne({
          where: { status_number: feedback.status_number },
        });
        if (!getStatus) {
          throw new NotFoundException(`${feedback.status_number} not found`);
        } else {
          const feedbackData = new EventsFeedbackModel();
          feedbackData.title = feedback.title;
          feedbackData.description = feedback.description;
          feedbackData.status = feedback.status;
          feedbackData.user_id = feedback.user_id;
          feedbackData.event_id = feedback.event_id;
          feedbackData.status_id = getStatus.dataValues.id;

          const feedbackResult = await this.eventsFeedbackModel.create(
            feedbackData.dataValues,
          );
          return feedbackResult;
        }
      }
    }
  }

  public async updateEventsFeedback(
    id: string,
    feedback: UpdateEventsFeedbackInput,
  ): Promise<EventsFeedbackModel> {
    const feedbackData = await this.eventsFeedbackModel.findOne({
      where: { id },
    });
    if (!feedbackData) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    } else {
      feedbackData.title = feedback.title;
      feedbackData.description = feedback.description;
      feedbackData.status = feedback.status;
      await this.eventsFeedbackModel.update(feedbackData.dataValues, {
        where: { id },
      });
      return feedbackData;
    }
  }

  public async deleteEventsFeedback(id: string): Promise<EventsFeedbackModel> {
    const feedbackData = await this.eventsFeedbackModel.findOne({
      where: { id },
    });
    if (!feedbackData) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    } else {
      await this.eventsFeedbackModel.destroy({
        where: { id },
      });
      return feedbackData;
    }
  }

  public async getEventsFeedback(id: string): Promise<EventsFeedbackModel> {
    const feedbackData = await this.eventsFeedbackModel
      .scope([
        { method: ['event_feedback_status'] },
        { method: ['feedback_events'] },
        { method: ['feedback_user'] },
      ])
      .findOne({
        where: { id },
      });
    return feedbackData;
  }

  public async getEventsFeedbacks(): Promise<Array<EventsFeedbackModel>> {
    const feedbackData = await this.eventsFeedbackModel
      .scope([
        { method: ['event_feedback_status'] },
        { method: ['feedback_events'] },
        { method: ['feedback_user'] },
      ])
      .findAll();
    return feedbackData;
  }
}
