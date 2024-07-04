import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CompareAnswersDto } from './dto/payload.dto';

@ApiTags('openai')
@Controller('openai')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('answers')
  async compareAnswers(@Body() compareAnswersDto: CompareAnswersDto[]) {
    const response = await this.openAiService.compareAnswers(compareAnswersDto);
    return response;
  }
}
