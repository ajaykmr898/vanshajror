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
import { QuestionsService } from './questions.service';
import {
  CreateResponsesDto,
  CreateQuestionDto,
  QuestionsResponses,
} from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { DefaultSuccessResponseDto } from '../utils/dto/response.dto';
import { QuestionResponse } from './entities/question.entity';

@ApiTags('questions')
@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiExcludeEndpoint()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get('responses/:userId')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: QuestionsResponses,
  })
  async getResponsesByUserId(@Param('userId') userId: number) {
    return await this.questionsService.findResponsesByUserId(userId);
  }

  @Post('responses')
  @ApiResponse({
    status: 200,
    type: DefaultSuccessResponseDto,
  })
  async saveResponses(
    @Body() createResponsesDto: CreateResponsesDto,
  ): Promise<void> {
    await this.questionsService.saveResponses(createResponsesDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: QuestionResponse,
  })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: QuestionResponse,
  })
  findOne(@Param('id') id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: number) {
    return this.questionsService.remove(id);
  }
}
