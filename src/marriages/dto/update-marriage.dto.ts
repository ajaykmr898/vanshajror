import {
  IsString,
  IsDate,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsObject,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMarriageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  open_to_marriage: string;

  /*@ApiProperty()
  @IsObject()
  @IsOptional()
  address?: object;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job: string;*/

  @ApiProperty()
  @IsNumber()
  owner_id?: number;

  /*@ApiProperty()
  @IsString()
  @IsNotEmpty()
  study: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;*/

  @ApiProperty()
  @IsString()
  @IsOptional()
  extra_info?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  deleted?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
