import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../auth/models/roles.model';
import { DefaultSuccessResponseDto } from '../../utils/dto/response.dto';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
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

export class UpdateUserDto {
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
}

export class UserFull extends CreateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

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
