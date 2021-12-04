import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TriviasModule } from './trivias/trivias.module';
import { JwtService } from './jwt/jwt.service';
import { BcryptService } from './bcrypt/bcrypt.service';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { CheckoutModule } from './checkout/checkout.module';
import { RolesGuard } from './users/guards/roles.guard';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      synchronize: false,
      autoLoadEntities: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot(),
    UsersModule,
    TriviasModule,
    CheckoutModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [
    AppService,
    JwtService,
    BcryptService,
    NodemailerService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
