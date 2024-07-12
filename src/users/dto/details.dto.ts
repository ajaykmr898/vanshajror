// personal-details.dto.ts
import { IsString, IsOptional, IsObject, IsInt } from 'class-validator';

export class CreatePersonalDetailsDto {
  @IsOptional()
  @IsString()
  religion: string;

  @IsOptional()
  @IsString()
  caste: string;

  @IsOptional()
  @IsString()
  subcaste: string;

  @IsOptional()
  @IsString()
  height: string;

  @IsString()
  complexion: string;

  @IsOptional()
  @IsString()
  marital_status: string;

  @IsOptional()
  @IsObject()
  pob: object;

  @IsOptional()
  @IsObject()
  por: object;

  /*@IsOptional()
  user_id: number;*/

  @IsOptional()
  @IsString()
  nationality: string;

  /*@IsOptional()
  @IsString()
  education: string;*/
}
