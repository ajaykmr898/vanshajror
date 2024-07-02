import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';
import { Response } from './entities/response.entity';
import { ResponseChoice } from './entities/response-choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Choice, Response, ResponseChoice]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
