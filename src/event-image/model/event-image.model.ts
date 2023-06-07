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

@ObjectType('EventImage')
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
  event_image_status: () => {
    return {
      include: {
        model: DataStatusModel,
        as: 'event_image_status',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@Table({ modelName: 'event_images' })
export class EventImageModel extends Model<EventImageModel> {
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
  event_image_status: DataStatusModel;
}
