import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { TriviasModule } from 'src/trivias/trivias.module';
@Module({
  imports: [TypeOrmModule.forFeature([Subject]), TriviasModule],
  providers: [SubjectsResolver, SubjectsService],
})
export class SubjectsModule {}
