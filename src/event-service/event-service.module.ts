import { Module } from '@nestjs/common';
import { EventServiceService } from './event-service.service';
import { EventServiceResolver } from './event-service.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventServiceModel } from './model/event-service.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([EventServiceModel, DataStatusModel])],
  providers: [EventServiceResolver, EventServiceService],
})
export class EventServiceModule {}
