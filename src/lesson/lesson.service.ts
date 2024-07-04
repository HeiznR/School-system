import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { LessonInput } from './dto/lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(lessonInput: LessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...lessonInput,
      ...{ id: uuid() },
    });
    return this.lessonRepository.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException('lesson is not exist');
    }
    return lesson;
  }
  async getLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find();
    return lessons;
  }
}
