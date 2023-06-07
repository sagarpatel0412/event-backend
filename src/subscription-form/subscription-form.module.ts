import { Module } from '@nestjs/common';
import { SubscriptionFormService } from './subscription-form.service';
import { SubscriptionFormResolver } from './subscription-form.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionFormModel } from './model/subscription-form.model';
import { ConfigModule } from '@nestjs/config';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true }),
    SequelizeModule.forFeature([SubscriptionFormModel, DataStatusModel]),
  ],
  providers: [SubscriptionFormResolver, SubscriptionFormService],
})
export class SubscriptionFormModule {}
