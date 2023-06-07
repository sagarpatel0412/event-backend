import { Module } from '@nestjs/common';
import { DataStatusService } from './data-status.service';
import { DataStatusResolver } from './data-status.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataStatusModel } from './model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([DataStatusModel])],
  providers: [DataStatusResolver, DataStatusService],
})
export class DataStatusModule {}
