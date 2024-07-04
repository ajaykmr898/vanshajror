import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './openai.service';
import config from '../config';
import { HttpModule } from '@nestjs/common';
import { OpenAiController } from './openai.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
