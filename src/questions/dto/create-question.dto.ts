import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question_text: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question_type: string;
}

export class ChoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  choice_text: string;
}

export class CreateResponseDto {
  @IsInt()
  question_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  response_text: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  choice_ids: number[];
}

export class CreateResponsesDto {
  @IsInt()
  user_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateResponseDto)
  responses: CreateResponseDto[];
}

export class QuestionsResponses {
  @ApiProperty()
  question_text: string;

  @ApiProperty()
  answer: string;
}
