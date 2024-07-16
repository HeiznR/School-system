import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './dto/lesson.input';
import { AssignStudentsToLessonInput } from './dto/assign-users-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

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

  @Mutation((returns) => LessonType)
  async assignUsersToLesson(
    @Args('assignUsersToLesson')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return await this.lessonService.assignUsersToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
