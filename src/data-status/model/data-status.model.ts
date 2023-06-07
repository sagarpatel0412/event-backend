import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CelestialPostModel } from 'src/celestial-post/model/celestial-post.model';
import { ContactFormModel } from 'src/contact-from/model/contact-form.model';
import { EventCityModel } from 'src/event-city/model/event-city.model';
import { EventImageModel } from 'src/event-image/model/event-image.model';
import { EventPriceModel } from 'src/event-price/model/event-price.model';
import { EventServiceModel } from 'src/event-service/model/event-service.model';
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';
import { EventTypesModel } from 'src/event-types/model/event-types.model';
import { EventsFeedbackModel } from 'src/events-feedback/model/events-feedback.model';
import { EventsRatingModel } from 'src/events-rating/model/events-rating.model';
import { EventsModel } from 'src/events/model/events.model';
import { PostCommentModel } from 'src/post-comment/model/post-comment.model';
import { PostLikeModel } from 'src/post-like/model/post-like.model';
import { SubscriptionFormModel } from 'src/subscription-form/model/subscription-form.model';
import { UserRolesModel } from 'src/user-roles/model/user-roles.model';
import { UserModel } from 'src/user/model/user.model';

@ObjectType('DataStatus')
@Scopes({
  users: () => {
    return {
      include: {
        model: UserModel,
        as: 'users',
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
  user_roles: () => {
    return {
      include: {
        model: UserRolesModel,
        as: 'user_roles',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  post_likes: () => {
    return {
      include: {
        model: PostLikeModel,
        as: 'post_likes',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  post_comments: () => {
    return {
      include: {
        model: PostCommentModel,
        as: 'post_comments',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  events: () => {
    return {
      include: {
        model: EventsModel,
        as: 'events',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_types: () => {
    return {
      include: {
        model: EventTypesModel,
        as: 'event_types',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_sub_types: () => {
    return {
      include: {
        model: EventSubTypesModel,
        as: 'event_sub_types',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_ratings: () => {
    return {
      include: {
        model: EventsRatingModel,
        as: 'event_ratings',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_feedbacks: () => {
    return {
      include: {
        model: EventsFeedbackModel,
        as: 'event_feedbacks',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  contact_forms: () => {
    return {
      include: {
        model: ContactFormModel,
        as: 'contact_forms',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  subscription_forms: () => {
    return {
      include: {
        model: SubscriptionFormModel,
        as: 'subscription_forms',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_cities: () => {
    return {
      include: {
        model: EventCityModel,
        as: 'event_cities',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_prices: () => {
    return {
      include: {
        model: EventPriceModel,
        as: 'event_prices',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_services: () => {
    return {
      include: {
        model: EventServiceModel,
        as: 'event_services',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_images: () => {
    return {
      include: {
        model: EventImageModel,
        as: 'event_images',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'app_statuses' })
export class DataStatusModel extends Model<DataStatusModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  status_number: number;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value_info: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Field(() => String)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Field(() => [UserModel])
  @HasMany(() => UserModel)
  users: UserModel[];

  @Field(() => [CelestialPostModel])
  @HasMany(() => CelestialPostModel)
  posts: CelestialPostModel[];

  @Field(() => [UserRolesModel])
  @HasMany(() => UserRolesModel)
  user_roles: UserRolesModel[];

  @Field(() => [PostLikeModel])
  @HasMany(() => PostLikeModel)
  post_likes: PostLikeModel[];

  @Field(() => [PostCommentModel])
  @HasMany(() => PostCommentModel)
  post_comments: PostCommentModel[];

  @Field(() => [EventsModel])
  @HasMany(() => EventsModel)
  events: EventsModel[];

  @Field(() => [EventTypesModel])
  @HasMany(() => EventTypesModel)
  event_types: EventTypesModel[];

  @Field(() => [EventSubTypesModel])
  @HasMany(() => EventSubTypesModel)
  event_sub_types: EventSubTypesModel[];

  @Field(() => [EventsRatingModel])
  @HasMany(() => EventsRatingModel)
  event_ratings: EventsRatingModel[];

  @Field(() => [EventsFeedbackModel])
  @HasMany(() => EventsFeedbackModel)
  event_feedbacks: EventsFeedbackModel[];

  @Field(() => [ContactFormModel])
  @HasMany(() => ContactFormModel)
  contact_forms: ContactFormModel[];

  @Field(() => [SubscriptionFormModel])
  @HasMany(() => SubscriptionFormModel)
  subscription_forms: SubscriptionFormModel[];

  @Field(() => [EventCityModel])
  @HasMany(() => EventCityModel)
  event_cities: EventCityModel[];

  @Field(() => [EventPriceModel])
  @HasMany(() => EventPriceModel)
  event_prices: EventPriceModel[];

  @Field(() => [EventServiceModel])
  @HasMany(() => EventServiceModel)
  event_services: EventServiceModel[];

  @Field(() => [EventImageModel])
  @HasMany(() => EventImageModel)
  event_images: EventImageModel[];
}
