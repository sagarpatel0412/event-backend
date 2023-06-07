import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/model/user.model';
import { UsersEventsModel } from './users-events.model';
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';
import { EventsRatingModel } from 'src/events-rating/model/events-rating.model';
import { EventsFeedbackModel } from 'src/events-feedback/model/events-feedback.model';
import { EventPriceModel } from 'src/event-price/model/event-price.model';
import { EventCityModel } from 'src/event-city/model/event-city.model';
import { EventServiceModel } from 'src/event-service/model/event-service.model';
import { EventImageModel } from 'src/event-image/model/event-image.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

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
  user_events: () => {
    return {
      include: {
        model: UserModel,
        as: 'user_events',
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
  events_rating_event: () => {
    return {
      include: {
        model: EventsRatingModel,
        as: 'events_rating_event',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  events_feedback_event: () => {
    return {
      include: {
        model: EventsFeedbackModel,
        as: 'events_feedback_event',
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
  event_status: () => {
    return {
      include: {
        model: DataStatusModel,
        as: 'event_status',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('Events')
@Table({ modelName: 'events' })
export class EventsModel extends Model<EventsModel> {
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

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Field(() => String)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  event_date: string;

  @Field(() => String)
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  event_time: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @Field(() => UserModel)
  @BelongsTo(() => UserModel)
  users: UserModel;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Field(() => [UserModel])
  @BelongsToMany(() => UserModel, () => UsersEventsModel)
  user_events: UserModel[];

  @ForeignKey(() => EventSubTypesModel)
  @Column({ field: 'event_sub_types_id' })
  eventSubTypesId: string;

  @Field(() => EventSubTypesModel, { nullable: true })
  @BelongsTo(() => EventSubTypesModel)
  event_sub_types: EventSubTypesModel;

  @Field(() => [EventsRatingModel], { nullable: true })
  @HasMany(() => EventsRatingModel)
  events_rating_event: EventsRatingModel[];

  @Field(() => [EventsFeedbackModel], { nullable: true })
  @HasMany(() => EventsFeedbackModel)
  events_feedback_event: EventsFeedbackModel[];

  @Field(() => [EventPriceModel], { nullable: true })
  @HasMany(() => EventPriceModel)
  event_prices: EventPriceModel[];

  @Field(() => [EventCityModel], { nullable: true })
  @HasMany(() => EventCityModel)
  event_cities: EventCityModel[];

  @Field(() => [EventServiceModel], { nullable: true })
  @HasMany(() => EventServiceModel)
  event_services: EventServiceModel[];

  @Field(() => [EventImageModel], { nullable: true })
  @HasMany(() => EventImageModel)
  event_images: EventImageModel[];

  @ForeignKey(() => DataStatusModel)
  @Column({ field: 'status_id' })
  status_id: string;

  @Field(() => DataStatusModel, { nullable: true })
  @BelongsTo(() => DataStatusModel)
  event_status: DataStatusModel;
}
