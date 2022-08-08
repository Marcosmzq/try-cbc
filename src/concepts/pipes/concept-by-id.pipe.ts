import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { ConceptsService } from '../concepts.service';

@Injectable()
export class ConceptByIdPipe implements PipeTransform {
  constructor(private readonly conceptsService: ConceptsService) {}

  async transform(value: any) {
    const concept = await this.conceptsService.findOne(value);
    if (!concept)
      throw new UserInputError(
        'The concept id provided is wrong, try with other.',
      );
    return concept;
  }
}
