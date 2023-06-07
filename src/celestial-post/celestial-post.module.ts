import { Module } from '@nestjs/common';
import { CelestialPostService } from './celestial-post.service';
import { CelestialPostResolver } from './celestial-post.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { CelestialPostModel } from './model/celestial-post.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([CelestialPostModel, DataStatusModel])],
  providers: [CelestialPostResolver, CelestialPostService],
  exports: [CelestialPostService],
})
export class CelestialPostModule {}
