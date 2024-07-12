import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Role } from '../../auth/models/roles.model';
import { DefaultSuccessResponseDto } from '../../utils/dto/response.dto';
import { Type } from 'class-transformer';
import { CreatePersonalDetailsDto } from './details.dto';
import { CreateEducationDto } from './education.dto';
import { CreateJobDto } from './job.dto';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ValidateNested()
  @Type(() => CreatePersonalDetailsDto)
  @IsOptional()
  personalDetails: CreatePersonalDetailsDto;

  @ValidateNested()
  @Type(() => CreateEducationDto)
  @IsOptional()
  education: CreateEducationDto;

  @ValidateNested()
  @Type(() => CreateJobDto)
  @IsOptional()
  job: CreateJobDto;
}

export class CreateAdminDto extends CreateUserDto {
  @ApiProperty()
  @IsEnum(Role)
  readonly role: Role;
}

/*
export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'password',
]) {}
*/

export class UpdateUserDto extends CreateUserDto {}

export class UserFull extends OmitType(PartialType(CreateUserDto), [
  'password',
]) {
  @ApiProperty()
  readonly id: number;

  /*@ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;*/

  @ApiProperty()
  readonly role: Role;
}

export class UsersListResponseDto extends DefaultSuccessResponseDto<
  UserFull[]
> {
  @ApiProperty({ type: [UserFull] })
  data: UserFull[];
}

export class UserResponseDto extends DefaultSuccessResponseDto<UserFull> {
  @ApiProperty({ type: UserFull })
  data: UserFull;
}
