import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentResolver } from './post-comment.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCommentModel } from './model/post-comment.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Module({
  imports: [SequelizeModule.forFeature([PostCommentModel, DataStatusModel])],
  providers: [PostCommentResolver, PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentModule {}
