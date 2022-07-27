import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TriviasModule } from './trivias/trivias.module';
import { CheckoutModule } from './checkout/checkout.module';
import { RolesGuard } from './users/guards/roles.guard';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check/health-check.controller';
import { TriviasAnswersModule } from './trivias-answers/trivias-answers.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import * as ormConfig from './ormconfig';
import { ConceptsModule } from './concepts/concepts.module';
import { QuotesModule } from './quotes/quotes.module';
import { NotesModule } from './notes/notes.module';
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
    AuthModule,
    NodemailerModule,
    ConceptsModule,
    QuotesModule,
    NotesModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
