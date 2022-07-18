import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from 'typeorm'

@Entity()
@ObjectType()
export class Course {
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
  name: string;

  @Field(() => Boolean)
  @Column()
  isPremium: boolean;

@Field(() => [Trivia])
  @OneToMany(() => Trivia, (trivia) => trivia.course)
  trivias: Trivia[];
}
