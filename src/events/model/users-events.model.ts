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
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from './events.model';
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
  user_events_status: () => {
    return {
      include: {
        model: DataStatusModel,
        as: 'user_events_status',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('UsersEvents')
@Table({ modelName: 'users_events' })
export class UsersEventsModel extends Model<UsersEventsModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  })
  userId: string;

  @Field(() => UserModel)
  @BelongsTo(() => UserModel, 'userId')
  users: UserModel;

  @ForeignKey(() => EventsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'event_id',
    references: {
      model: 'events',
      key: 'id',
    },
  })
  eventId: string;

  @Field(() => EventsModel)
  @BelongsTo(() => EventsModel, 'eventId')
  events: EventsModel;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => DataStatusModel)
  @Column({ field: 'status_id' })
  status_id: string;

  @Field(() => DataStatusModel, { nullable: true })
  @BelongsTo(() => DataStatusModel)
  user_events_status: DataStatusModel;
}
