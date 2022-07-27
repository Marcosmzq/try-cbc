import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class TriviasAnswer {
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

  @Field(() => Int)
  @Column()
  trivia_id: number;

  @Field(() => Trivia)
  @ManyToOne(() => Trivia, { eager: true })
  @JoinColumn({ name: 'trivia_id', referencedColumnName: 'id' })
  trivia: Trivia;
}
