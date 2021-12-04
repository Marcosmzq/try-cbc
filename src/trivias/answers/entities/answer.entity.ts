import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AnswerType } from '../enums/answerType.enum';

@Entity()
@ObjectType()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: string;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: string;

  @Field(() => String)
  @Column()
  statement: string;

  @Field(() => Boolean)
  @Column()
  isTrue: boolean;

  @Field(() => AnswerType)
  @Column()
  type: AnswerType;

  @Field(() => Int)
  @Column()
  trivia_id: number;

  @Field(() => Trivia)
  @ManyToOne((type) => Trivia, { eager: true })
  @JoinColumn({ name: 'trivia_id', referencedColumnName: 'id' })
  trivia: Trivia;
}
