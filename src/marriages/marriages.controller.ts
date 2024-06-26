import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MarriageService } from './marriages.service';
import {
  CreateMarriageDto,
  MarriageResponseDto,
  MarriageListResponseDto,
} from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('marriages')
@Controller('marriages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarriageController {
  constructor(private readonly marriagesService: MarriageService) {}

  @ApiResponse({
    status: 201,
    isArray: false,
    type: MarriageResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Post()
  async create(@Body() createMarriageDto: CreateMarriageDto) {
    try {
      const resp = await this.marriagesService.create(createMarriageDto);
      return resp;
      //return createSuccessResponse(resp);
    } catch (err) {
      //return createErrorResponse(err);
    }
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: MarriageListResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Get()
  async findAll() {
    try {
      const resp = await this.marriagesService.findAll();
      return resp;
      //return createSuccessResponse(resp);
    } catch (err) {
      //return createErrorResponse(err);
    }
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: MarriageResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      let resp = this.marriagesService.findOne(id);
      return resp;
      //return createSuccessResponse(resp);
    } catch (err) {
      //return createErrorResponse(err);
    }
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: MarriageResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMarriageDto: UpdateMarriageDto,
  ) {
    return this.marriagesService.update(id, updateMarriageDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marriagesService.remove(id);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: MarriageListResponseDto,
  })
  @ApiBearerAuth('access-token')
  @Get('dates/filter')
  findBetweenDates(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('gender') gender: string,
    @Query('poi') poi: object,
    @Query('study') study: string,
    @Query('status') status: string,
    @Query('name') name: string,
    @Query('phone') phone: string,
    @Query('email') email: string,
  ) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return this.marriagesService.findFilters({
      fromDate,
      toDate,
      gender,
      poi,
      study,
      status,
      name,
      phone,
      email,
    });
  }
}
