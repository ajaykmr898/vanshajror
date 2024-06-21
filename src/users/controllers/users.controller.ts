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
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import {
  CreateAdminDto,
  CreateUserDto,
  UpdateUserDto,
  UsersListResponseDto,
  UserResponseDto,
} from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../../utils/dto/response.dto';

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
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const resp = await this.usersService.create(createUserDto);
      return createSuccessResponse(resp);
    } catch (err) {
      return createErrorResponse(err);
    }
  }

  @ApiOperation({ summary: 'create a user with admin role' })
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.ADMIN)
  @Post('admin')
  async createAdmin(@Body() creatAdminDto: CreateAdminDto) {
    try {
      const resp = await this.usersService.create(creatAdminDto);
      return createSuccessResponse(resp);
    } catch (err) {
      return createErrorResponse(err);
    }
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: UsersListResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    try {
      const resp = await this.usersService.findAll();
      return createSuccessResponse(resp);
    } catch (err) {
      return createErrorResponse(err);
    }
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const resp = await this.usersService.findOne(+id);
      return createSuccessResponse(resp);
    } catch (err) {
      return createErrorResponse(err);
    }
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const resp = await this.usersService.update(+id, updateUserDto);
      return createSuccessResponse(resp);
    } catch (err) {
      return createErrorResponse(err);
    }
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const resp = await this.usersService.remove(+id);
      return createSuccessResponse([]);
    } catch (err) {
      return createErrorResponse(err);
    }
  }
}
