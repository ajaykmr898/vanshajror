import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { stringify } from 'ts-jest';
import { CompareAnswersDto } from './dto/payload.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OpenAiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.openai.apiKey;
    this.apiUrl = this.configService.openai.apiUrl;
  }

  async compareAnswers(answers: CompareAnswersDto[]): Promise<any> {
    let prompt = `Compare the following answers and provide feedback on the differences and similarities and give me their compatibility in percentage:`;
    prompt += `\n\n${stringify(answers)}`;

    console.log(prompt);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt,
      max_tokens: 1500,
      n: 1,
      stop: null,
      temperature: 0.7,
    };

    try {
      /*const response = await this.httpService
        .post(this.apiUrl, data, { headers })
        .toPromise();*/
      const response = { result: '50%' };
      return response;
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      throw error;
    }
  }
}
