import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  salary: number;

  @IsBoolean()
  @IsOptional()
  is_remote?: boolean;

  @IsOptional()
  user_id: number;
}
