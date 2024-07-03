import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, QuestionResponse } from './entities/question.entity';
import {
  CreateQuestionDto,
  CreateResponsesDto,
  QuestionsResponses,
} from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Choice } from './entities/choice.entity';
import { ResponseChoice } from './entities/response-choice.entity';
import { Response } from './entities/response.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choicesRepository: Repository<Choice>,
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    @InjectRepository(ResponseChoice)
    private responseChoicesRepository: Repository<ResponseChoice>,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionsRepository.create(createQuestionDto);
    return this.questionsRepository.save(question);
  }

  async findResponsesByUserId(userId: number): Promise<QuestionsResponses> {
    const query = `
      SELECT
          q.question_text,
          STRING_AGG(c.choice_text, ', ') AS answer
      FROM
          questions q
          JOIN responses r ON q.id = r.question_id
          JOIN response_choices rc ON r.id = rc.response_id
          JOIN choices c ON rc.choice_id = c.id
          JOIN users u ON r.user_id = u.id
      WHERE
          q.question_type IN ('single_choice', 'multiple_choice')
          AND r.user_id = $1
      GROUP BY
          q.id, u.id

      UNION ALL

      SELECT
          q.question_text,
          r.response_text AS answer
      FROM
          questions q
          JOIN responses r ON q.id = r.question_id
          JOIN users u ON r.user_id = u.id
      WHERE
          q.question_type = 'text'
          AND r.user_id = $1
    `;

    return await this.questionsRepository.query(query, [userId]);
  }

  async saveResponses(createResponsesDto: CreateResponsesDto): Promise<void> {
    const { user_id, responses } = createResponsesDto;

    for (const response of responses) {
      const { question_id, response_text, choice_ids } = response;

      // Save the main response
      const newResponse = this.responsesRepository.create({
        question_id,
        user_id,
        response_text,
      });
      const savedResponse = await this.responsesRepository.save(newResponse);

      // Save the choices related to the response
      if (choice_ids && !!choice_ids.length) {
        for (const choice_id of choice_ids) {
          const responseChoice = this.responseChoicesRepository.create({
            response_id: savedResponse.id,
            choice_id,
          });
          await this.responseChoicesRepository.save(responseChoice);
        }
      }
    }
  }

  async findAll(): Promise<QuestionResponse[]> {
    const questions = await this.questionsRepository.find();
    const choices = await this.choicesRepository.find();
    //console.log(questions, choices);
    return questions.map((question) => ({
      id: question.id,
      question_text: question.question_text,
      question_type: question.question_type,
      choices: choices
        ?.filter((choice) => choice.question_id === question.id)
        .map((choice) => ({
          id: choice.id,
          choice_text: choice.choice_text,
        })),
    }));
  }

  async findOne(id: number): Promise<QuestionResponse[]> {
    const questions = await this.questionsRepository.findOne({ where: { id } });
    const choices = await this.choicesRepository.find({
      where: { question_id: id },
    });
    //console.log(questions, choices);
    return [questions].map((question) => ({
      id: question.id,
      question_text: question.question_text,
      question_type: question.question_type,
      choices: choices
        ?.filter((choice) => choice.question_id === question.id)
        .map((choice) => ({
          id: choice.id,
          choice_text: choice.choice_text,
        })),
    }));
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    await this.questionsRepository.update(id, updateQuestionDto);
    const updatedQuestion = await this.questionsRepository.findOne({
      where: { id },
    });
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
