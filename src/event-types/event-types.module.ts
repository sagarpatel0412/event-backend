import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesResolver } from './event-types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTypesModel } from './model/event-types.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([EventTypesModel, DataStatusModel])],
  providers: [EventTypesResolver, EventTypesService],
})
export class EventTypesModule {}
