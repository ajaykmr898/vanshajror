import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Choice } from './entities/choice.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choicesRepository: Repository<Choice>,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionsRepository.create(createQuestionDto);
    return this.questionsRepository.save(question);
  }

  async findAll(): Promise<
    {
      question_text: string;
      question_type: string;
      id: number;
      choices: { choice_text: string; id: number }[];
    }[]
  > {
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

  async findOne(id: number) {
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
