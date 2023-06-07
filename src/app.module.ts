import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CelestialPostModule } from './celestial-post/celestial-post.module';
import { AuthModule } from './auth/auth.module';
import { PostLikeModule } from './post-like/post-like.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import * as Validation from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { EventTypesModule } from './event-types/event-types.module';
import { EventSubTypesModule } from './event-sub-types/event-sub-types.module';
import { EventsRatingModule } from './events-rating/events-rating.module';
import { EventsFeedbackModule } from './events-feedback/events-feedback.module';
import { ContactFromModule } from './contact-from/contact-from.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscriptionFormModule } from './subscription-form/subscription-form.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventPriceModule } from './event-price/event-price.module';
import { EventCityModule } from './event-city/event-city.module';
import { EventServiceModule } from './event-service/event-service.module';
import { EventImageModule } from './event-image/event-image.module';
import { DataStatusModule } from './data-status/data-status.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: Validation.object({
        SALT: Validation.string().required(),
        PORT: Validation.number().port().required(),
        // GraphQL
        GRAPHQL_PATH: Validation.string().required(),
        GRAPHQL_PLAYGROUND: Validation.boolean().required(),
        GRAPHQL_DEBUG: Validation.boolean().required(),
        // DB
        POSTGRES_HOST: Validation.string().required(),
        POSTGRES_PORT: Validation.number().port().required(),
        POSTGRES_DB: Validation.string().required(),
        POSTGRES_USERNAME: Validation.string().required(),
        POSTGRES_PASSWORD: Validation.string().required(),
        EMAIL_HOST: Validation.string().required(),
        EMAIL_ADDRESS: Validation.string().required(),
        EMAIL_PASSWORD: Validation.string().required(),
        STRIPE_PUBLIC_KEY: Validation.string().required(),
        STRIPE_SECRET_KEY: Validation.string().required(),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadModels: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      playground: true,
      path: '/graphql',
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    CelestialPostModule,
    AuthModule,
    PostLikeModule,
    PostCommentModule,
    EventsModule,
    UserRolesModule,
    EventTypesModule,
    EventSubTypesModule,
    EventsRatingModule,
    EventsFeedbackModule,
    ContactFromModule,
    SubscriptionFormModule,
    EventPriceModule,
    EventCityModule,
    EventServiceModule,
    EventImageModule,
    DataStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
