import { CreateCourseInput } from './create-course.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {}
