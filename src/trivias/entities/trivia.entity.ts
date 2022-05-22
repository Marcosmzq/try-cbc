import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answers/entities/answer.entity';
import { ExamList } from '../enums/examList.enum';
import { TriviaType } from '../enums/triviaType.enum';

@Entity()
@ObjectType()
export class Trivia {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => TriviaType)
  @Column({ default: TriviaType.TRIVIA })
  type: TriviaType;

  @Field(() => String)
  @CreateDateColumn()
  created_at: string;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: string;

  @Field(() => String)
  @Column()
  statement: string;

  @Field(() => String)
  @Column({ nullable: true })
  source: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  feedback: string;

  @Field(() => ExamList)
  @Column()
  exam: ExamList;

  @Field(() => Subject)
  @ManyToOne(() => Subject, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.trivia)
  answers: Answer[];
}
