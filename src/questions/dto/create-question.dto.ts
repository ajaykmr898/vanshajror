import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly question_text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly question_type: string;
}

export class ChoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  choice_text: string;
}
