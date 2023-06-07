import { Module } from '@nestjs/common';
import { EventPriceService } from './event-price.service';
import { EventPriceResolver } from './event-price.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventPriceModel } from './model/event-price.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([EventPriceModel, DataStatusModel])],
  providers: [EventPriceResolver, EventPriceService],
})
export class EventPriceModule {}
