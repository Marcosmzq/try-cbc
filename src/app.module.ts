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
import { TriviasAnswersModule } from './trivias-answers/trivias-answers.module';
import { CoursesModule } from './courses/courses.module';
import * as ormConfig from './ormconfig';
import { ConceptsModule } from './concepts/concepts.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),

    UsersModule,
    TriviasModule,
    CheckoutModule,
    TriviasAnswersModule,
    CoursesModule,
    ConceptsModule,
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
