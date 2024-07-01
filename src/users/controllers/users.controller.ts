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
} from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

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
  create(@Body() createUserDto: CreateUserDto) {
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
  @Post('admin')
  createAdmin(@Body() creatAdminDto: CreateAdminDto) {
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
  findAll() {
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

  @ApiBearerAuth('access-token')
  //@Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const resp = this.usersService.remove(+id);
    return resp;
  }
}
