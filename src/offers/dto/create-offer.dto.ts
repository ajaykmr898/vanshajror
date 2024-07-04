import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  types: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  from?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  to?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  charge?: number;
}
