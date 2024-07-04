import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './dto/lesson.input';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => LessonType)
  lesson() {
    return {
      id: 'asdf233',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
  @Mutation((returns) => LessonType)
  async createLesson(@Args('lessonInput') lessonInput: LessonInput) {
    return await this.lessonService.createLesson(lessonInput);
  }

  @Query((returns) => LessonType)
  async getLesson(@Args('id') id: string) {
    return await this.lessonService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  async getLessons() {
    return await this.lessonService.getLessons();
  }
}
