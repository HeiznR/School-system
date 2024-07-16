import { Field, InputType } from '@nestjs/graphql';
import { IsString, Min, MinLength } from 'class-validator';

@InputType()
export class StudentInput {
  @Field()
  @IsString()
  @MinLength(1)
  firstName: string;
  @Field()
  @IsString()
  @MinLength(1)
  lastName: string;
}
