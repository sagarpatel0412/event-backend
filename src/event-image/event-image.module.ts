import { Module } from '@nestjs/common';
import { EventImageService } from './event-image.service';
import { EventImageResolver } from './event-image.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventImageModel } from './model/event-image.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([EventImageModel, DataStatusModel])],
  providers: [EventImageResolver, EventImageService],
})
export class EventImageModule {}
