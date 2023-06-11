import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CelestialPostModel } from 'src/celestial-post/model/celestial-post.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@ObjectType('BlogImage')
@Scopes({
  blog_image_status: () => {
    return {
      include: {
        model: DataStatusModel,
        as: 'blog_image_status',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  posts: () => {
    return {
      include: {
        model: CelestialPostModel,
        as: 'posts',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'blog_images' })
export class BlogImageModel extends Model<BlogImageModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => DataStatusModel)
  @Column({ field: 'status_id' })
  status_id: string;

  @Field(() => DataStatusModel, { nullable: true })
  @BelongsTo(() => DataStatusModel)
  blog_image_status: DataStatusModel;

  @ForeignKey(() => CelestialPostModel)
  @Column({ field: 'post_id' })
  post_id: string;

  @Field(() => CelestialPostModel, { nullable: true })
  @BelongsTo(() => CelestialPostModel)
  posts: CelestialPostModel;
}
