import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    const students = await this.studentRepository.find();
    return students;
  }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Student is not exist');
    }
    return student;
  }

  async createStudent(studentInput: StudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      ...studentInput,
      ...{ id: uuid() },
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: [...studentIds],
        } as any,
      },
    });
  }
}
