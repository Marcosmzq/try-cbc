import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';
import { Concept } from './entities/concept.entity';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from '../courses/courses.service';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/userRole.enum';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(
    currentUser: User,
    course: Course,
    createConceptInput: CreateConceptInput,
  ) {
    const { title, description } = createConceptInput;
    const newConcept = this.conceptRepository.create({
      title,
      description,
      author: currentUser,
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

  findCurrentUserConceptsByCourse(currentUser: User, course: Course) {
    return this.conceptRepository.find({
      where: {
        course,
        author: currentUser,
      },
    });
  }

  findCurrentUserRandomConceptByCourse(currentUser: User, course: Course) {
    return this.conceptRepository
      .createQueryBuilder('concept')
      .leftJoinAndSelect('concept.author', 'author')
      .leftJoinAndSelect('concept.course', 'course')
      .orderBy('RANDOM()')
      .where({
        course,
        author: currentUser,
      })
      .getOne();
  }

  findAllAdminConceptsByCourse(course_id: number) {
    return this.conceptRepository.find({
      where: {
        course: { id: course_id },
        author: { role: UserRole.ADMIN },
      },
    });
  }

  async update(concept: Concept, updateConceptInput: UpdateConceptInput) {
    const { description, title } = updateConceptInput;
    if (title) concept.title = title;
    if (description) concept.description = description;
    return this.conceptRepository.save(concept);
  }

  remove(concept_id: number) {
    return this.conceptRepository.delete(concept_id);
  }
}
