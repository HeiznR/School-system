import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLessonDto {
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  name: string;
  @IsDate()
  @IsString()
  startDate: string;
  @IsDate()
  @IsString()
  endDate: string;
}
