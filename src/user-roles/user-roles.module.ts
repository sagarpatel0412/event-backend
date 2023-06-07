import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesResolver } from './user-roles.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRolesModel } from './model/user-roles.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRolesModel, DataStatusModel])],
  providers: [UserRolesResolver, UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
