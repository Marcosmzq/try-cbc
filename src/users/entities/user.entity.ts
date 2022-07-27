import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from '../enums/userRole.enum';
import { Concept } from 'src/concepts/entities/concept.entity';
import { Quote } from 'src/quotes/entities/quote.entity';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
@ObjectType()
export class User {
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
  username: string;

  @Field(() => String)
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ default: UserRole.FREE_USER })
  role: UserRole;

  @Field(() => [Concept])
  @OneToMany(() => Concept, (concept) => concept.author)
  concepts: Concept[];

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote) => quote.user)
  quotes: Quote[];

  @Field(() => [Note])
  @OneToMany(() => Note, (note) => note.author)
  notes: Note[];
}
