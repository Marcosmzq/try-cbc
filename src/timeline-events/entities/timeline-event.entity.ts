import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Timeline } from 'src/timelines/entities/timeline.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';

@Entity()
@ObjectType()
export class TimelineEvent {
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
  eventDate: string;

  @Field(() => String)
  @Column()
  eventTitle: string;

  @Field(() => String)
  @Column()
  eventContent: string;

  @Field(() => Timeline)
  @ManyToOne(() => Timeline, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  timeline: Timeline;
}
