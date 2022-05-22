import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  create(createSubjectInput: CreateSubjectInput) {
    const subject = this.subjectRepository.create(createSubjectInput);
    return this.subjectRepository.save(subject);
  }

  findAll() {
    return this.subjectRepository.find({ relations: ['trivias'] });
  }

  findOne(id: number) {
    return this.subjectRepository.findOne(id, { relations: ['trivias'] });
  }

  async update(id: number, updateSubjectInput: UpdateSubjectInput) {
    const { isPremium, name } = updateSubjectInput;
    const subject = await this.subjectRepository.findOne(id);
    if (name) subject.name = name;
    if (isPremium) subject.isPremium = isPremium;

    return this.subjectRepository.save(subject);
  }

  remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
