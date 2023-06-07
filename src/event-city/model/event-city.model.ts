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
import { DataStatusModel } from 'src/data-status/model/data-status.model';
import { EventsModel } from 'src/events/model/events.model';

@ObjectType('EventCity')
@Scopes({
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
  event_city_status: () => {
    return {
      include: {
        model: DataStatusModel,
        as: 'event_city_status',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'event_cities' })
export class EventCityModel extends Model<EventCityModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Field(() => String)
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  event_time: string;

  @Field(() => String)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  event_date: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

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
    type: DataType.TEXT,
    allowNull: false,
  })
  address: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cost: string;

  @Field(() => String)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  terms_condition: string;

  @Field(() => String)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

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
  longitude: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  latitude: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pincode: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency_code: string;

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

  @ForeignKey(() => EventsModel)
  @Column({ field: 'events_id' })
  events_id: string;

  @Field(() => EventsModel)
  @BelongsTo(() => EventsModel)
  events: EventsModel;

  @ForeignKey(() => DataStatusModel)
  @Column({ field: 'status_id' })
  status_id: string;

  @Field(() => DataStatusModel, { nullable: true })
  @BelongsTo(() => DataStatusModel)
  event_city_status: DataStatusModel;
}
