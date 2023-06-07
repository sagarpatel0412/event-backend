import { Module } from '@nestjs/common';
import { EventCityService } from './event-city.service';
import { EventCityResolver } from './event-city.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventCityModel } from './model/event-city.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([EventCityModel, DataStatusModel])],
  providers: [EventCityResolver, EventCityService],
})
export class EventCityModule {}
