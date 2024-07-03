import { ApiProperty } from '@nestjs/swagger';
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

class CreateResponseDto {
  @IsInt()
  question_id: number;

  @IsOptional()
  @IsString()
  @IsOptional()
  response_text: string;

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
