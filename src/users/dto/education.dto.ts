import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEducationDto {
  @IsOptional()
  @IsString()
  education_level: string;

  @IsOptional()
  @IsString()
  college: string;

  @IsOptional()
  @IsString()
  degree: string;

  @IsOptional()
  @IsString()
  specialization: string;

  @IsOptional()
  @IsNumber()
  graduation_year: number;

  @IsOptional()
  user_id: number;
}
