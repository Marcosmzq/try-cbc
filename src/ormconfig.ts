import { ConnectionOptions } from 'typeorm';
import { Answer } from './trivias/answers/entities/answer.entity';
import { Trivia } from './trivias/entities/trivia.entity';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Subject } from './subjects/entities/subject.entity';
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
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  entities: [User, Trivia, Answer, Subject],
};

const ormConfigDev: ConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [User, Trivia, Answer, Subject],
  dropSchema: true,
  synchronize: true,
};

const ormConfig =
  process.env.NODE_ENV === 'development' ? ormConfigDev : ormConfigProd;

export = ormConfig;
