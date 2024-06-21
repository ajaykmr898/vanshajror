import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MarriageService } from './marriages.service';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultColumnsResponse } from './dto/create-marriage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('marriages') // put the name of the controller in swagger
@Controller('marriages')
@UseGuards(JwtAuthGuard, RolesGuard) //  makes the all routs as private by default
export class MarriageController {
  constructor(private readonly marriagesService: MarriageService) {}

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createMarriageDto: CreateMarriageDto) {
    return this.marriagesService.create(createMarriageDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.marriagesService.findAll();
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marriagesService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    type: DefaultColumnsResponse,
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
}