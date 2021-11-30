import { Test, TestingModule } from '@nestjs/testing';
import { NoticeController } from './notice.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { NoticeModule } from './notice.module';
import { ProjectModule } from '../project/project.module';

describe('NoticeController', () => {
  let controller: NoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath:
            process.env.NODE_ENV == 'prod' ? '.env.prod' : '.env.dev',
          validationSchema: Joi.object({
            DATABASE_HOST: Joi.string().required(),
            DATABASE_PORT: Joi.string().required(),
            DATABASE_USERNAME: Joi.string().required(),
            DATABASE_PASSWORD: Joi.string().required(),
            DATABASE_NAME: Joi.string().required(),
          }),
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [`dist/entities/**/*.{ts,js}`],
          synchronize: process.env.NODE_ENV == 'dev',
          logging: process.env.NODE_ENV == 'prod' ? true : ['error'],
          extra: {
            connectionLimit: process.env.DB_CONNECTION_LIMIT,
          },
        }),
        UserModule,
        NoticeModule,
        ProjectModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<NoticeController>(NoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
