import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
  CreateAdminDto,
  CreateUserDto,
  UpdateUserDto,
  UsersListResponseDto,
  UserResponseDto,
  UserFull,
} from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { DefaultSuccessResponseDto } from '../../utils/dto/response.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create a user with user role' })
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
  })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserFull> {
    const resp = this.usersService.create(createUserDto);
    return resp;
  }

  @ApiOperation({ summary: 'create a user with admin role' })
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
  })
  @ApiBearerAuth('access-token')
  //@Roles(Role.ADMIN)
  //@Post('admin')
  createAdmin(@Body() creatAdminDto: CreateAdminDto): Promise<UserFull> {
    const resp = this.usersService.create(creatAdminDto);
    return resp;
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: UsersListResponseDto,
  })
  @ApiBearerAuth('access-token')
  //@Roles(Role.ADMIN)
  @Get()
  findAll(): Promise<UserFull[]> {
    const resp = this.usersService.findAll();
    return resp;
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    isArray: false,
    type: UserResponseDto,
  })
  //@Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    let resp = this.usersService.findOne(+id);
    return resp;
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: UserResponseDto,
  })
  @ApiBearerAuth('access-token')
  //@Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultSuccessResponseDto,
  })
  @ApiBearerAuth('access-token')
  //@Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultSuccessResponseDto,
  })
  @Public()
  @Post('confirm-otp')
  async confirmOtp(@Body('email') email: string, @Body('otp') otp: string) {
    await this.usersService.confirmOtp(email, otp);
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultSuccessResponseDto,
  })
  @Public()
  @Post('confirm-email')
  async confirmEmail(
    @Body('email') email: string,
    @Body('token') token: string,
  ) {
    await this.usersService.confirmEmail(email, token);
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultSuccessResponseDto,
  })
  @Public()
  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    await this.usersService.resendOtp(email);
  }
}
