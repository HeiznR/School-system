import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentInput } from './dto/student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(@Args('studentInput') studentInput: StudentInput) {
    return await this.studentService.createStudent(studentInput);
  }
  @Query(() => [StudentType])
  async getStudents() {
    return await this.studentService.getAllStudents();
  }
  @Query(() => StudentType)
  async getStudentById(@Args('id') id: string) {
    return await this.studentService.getStudentById(id);
  }
}
