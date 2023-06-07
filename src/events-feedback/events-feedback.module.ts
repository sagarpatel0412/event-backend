import { Module } from '@nestjs/common';
import { EventsFeedbackService } from './events-feedback.service';
import { EventsFeedbackResolver } from './events-feedback.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsFeedbackModel } from './model/events-feedback.model';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EventsFeedbackModel,
      UserModel,
      EventsModel,
      DataStatusModel,
    ]),
  ],
  providers: [EventsFeedbackResolver, EventsFeedbackService],
})
export class EventsFeedbackModule {}
