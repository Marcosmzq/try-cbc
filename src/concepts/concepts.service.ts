import { Dependencies, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';
import { Concept } from './entities/concept.entity';
import { UsersService } from '../users/users.service';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
@Dependencies(UsersService, CoursesService)
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
    private readonly userService: UsersService,
    private readonly courseService: CoursesService,
  ) {}

  async create(createConceptInput: CreateConceptInput) {
    const { author_id, course_id, title, description } = createConceptInput;
    const user = await this.userService.findOne(author_id);
    if (!user)
      throw new UserInputError(
        'The author id passed not belongs to any user. Try with other.',
      );
    const course = await this.courseService.findOne(course_id);
    if (!course)
      throw new UserInputError(
        'The course id passed is not valid. Try with other.',
      );
    const newConcept = this.conceptRepository.create({
      title,
      description,
      author: user,
      course,
    });
    return this.conceptRepository.save(newConcept);
  }

  findAll() {
    return this.conceptRepository.find();
  }

  findOne(id: number) {
    return this.conceptRepository.findOne(id);
  }

  findByAuthor(author_id) {
    return this.conceptRepository.find({ author: { id: author_id } });
  }

  findByCourse(course_id) {
    return this.conceptRepository.find({ course: { id: course_id } });
  }

  async update(concept_id: number, updateConceptInput: UpdateConceptInput) {
    const { author_id, course_id, description, title } = updateConceptInput;
    const concept = await this.conceptRepository.findOne(concept_id);
    if (author_id) {
      const updatedAuthor = await this.userService.findOne(author_id);
      if (!updatedAuthor)
        throw new UserInputError(
          'The author id passed not belongs to any user. Try with other.',
        );
      concept.author = updatedAuthor;
    }
    if (course_id) {
      const updatedCourse = await this.courseService.findOne(course_id);
      if (!updatedCourse)
        throw new UserInputError(
          'The course id passed not belongs to any course. Try with other.',
        );
      concept.course = updatedCourse;
    }
    if (title) concept.title = title;
    if (description) concept.description = description;
    return this.conceptRepository.save(concept);
  }

  remove(id: number) {
    return this.conceptRepository.delete(id);
  }
}
