import {
  IsString,
  IsDate,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultSuccessResponseDto } from '../../utils/dto/response.dto';
import { UserFull } from '../../users/dto/create-user.dto';

export class CreateMarriageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
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
  job: string;

  @ApiProperty()
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
  email?: string;

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
}

export class MarriageFull extends CreateMarriageDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class MarriageListResponseDto extends DefaultSuccessResponseDto<
  MarriageFull[]
> {
  @ApiProperty({ type: [MarriageFull] })
  data: MarriageFull[];
}

export class MarriageResponseDto extends DefaultSuccessResponseDto<MarriageFull> {
  @ApiProperty({ type: MarriageFull })
  data: MarriageFull;
}
