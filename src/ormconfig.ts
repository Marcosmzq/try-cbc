import { ConnectionOptions } from 'typeorm';
import { Trivia } from './trivias/entities/trivia.entity';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TriviasAnswer } from './trivias-answers/entities/trivias-answer.entity';
import { Course } from './courses/entities/course.entity';
ConfigModule.forRoot();

const ormConfigProd: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  ssl: true,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [User, Trivia, TriviasAnswer, Course],
};

const ormConfigDev: ConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [User, Trivia, TriviasAnswer, Course],
  dropSchema: true,
  synchronize: true,
  logging: true,
};

const ormConfig =
  process.env.NODE_ENV === 'production' ? ormConfigProd : ormConfigDev;

export = ormConfig;
