import { Module } from '@nestjs/common';
import { BlogImageService } from './blog-image.service';
import { BlogImageResolver } from './blog-image.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogImageModel } from './model/blog-image.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([BlogImageModel, DataStatusModel])],
  providers: [BlogImageResolver, BlogImageService],
})
export class BlogImageModule {}
