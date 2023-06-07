import { Module } from '@nestjs/common';
import { EventSubTypesService } from './event-sub-types.service';
import { EventSubTypesResolver } from './event-sub-types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventSubTypesModel } from './model/event-sub-types.model';
import { EventTypesModel } from 'src/event-types/model/event-types.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EventSubTypesModel,
      EventTypesModel,
      DataStatusModel,
    ]),
  ],
  providers: [EventSubTypesResolver, EventSubTypesService],
})
export class EventSubTypesModule {}
