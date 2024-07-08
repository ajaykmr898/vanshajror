import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { enviroments } from './environments';
import { UsersModule } from './users/users.module';
import { MarriagesModule } from './marriages/marriages.module';
import { QuestionsModule } from './questions/questions.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { OpenAiModule } from './openai/openai.module';
import { OffersModule } from './offers/offers.module';
import { MailerConfigModule } from './mailer/mailer.module';
import * as fs from 'fs';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.postgres.host,
          port: configService.postgres.port,
          database: configService.postgres.name,
          username: configService.postgres.user,
          password: configService.postgres.password,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          synchronize: true,
          ssl: {
            ca: fs
              .readFileSync(
                path.join(__dirname, '/var/task/src/certs/prod-ca.crt'),
              )
              .toString(),
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    MarriagesModule,
    QuestionsModule,
    OpenAiModule,
    OffersModule,
    MailerConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
