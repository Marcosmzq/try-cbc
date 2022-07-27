import { Module } from '@nestjs/common';
import { TimelinesService } from './timelines.service';
import { TimelinesResolver } from './timelines.resolver';
import { Timeline } from './entities/timeline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, CoursesModule, TypeOrmModule.forFeature([Timeline])],
  providers: [TimelinesResolver, TimelinesService],
  exports: [TimelinesService],
})
export class TimelinesModule {}
