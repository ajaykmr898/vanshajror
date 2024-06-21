import { Test, TestingModule } from '@nestjs/testing';
import { MarriagesController } from './marriages.controller';
import { MarriagesService } from './marriages.service';

describe('MarriagesController', () => {
  let controller: MarriagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarriagesController],
      providers: [MarriagesService],
    }).compile();

    controller = module.get<MarriagesController>(MarriagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});