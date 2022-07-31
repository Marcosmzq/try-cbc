import { Module } from '@nestjs/common';
import { TriviasService } from './trivias.service';
import { TriviasResolver } from './trivias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from './entities/trivia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia])],
  providers: [TriviasResolver, TriviasService],
})
export class TriviasModule {}
