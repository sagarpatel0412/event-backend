import { Module } from '@nestjs/common';
import { ContactFromService } from './contact-from.service';
import { ContactFromResolver } from './contact-from.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactFormModel } from './model/contact-form.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([ContactFormModel, DataStatusModel])],
  providers: [ContactFromResolver, ContactFromService],
})
export class ContactFromModule {}
