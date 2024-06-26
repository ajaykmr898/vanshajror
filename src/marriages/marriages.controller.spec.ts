import { Test, TestingModule } from '@nestjs/testing';
import { MarriageController } from './marriages.controller';
import { MarriageService } from './marriages.service';

describe('MarriagesController', () => {
  let controller: MarriageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarriageController],
      providers: [MarriageService],
    }).compile();

    controller = module.get<MarriageController>(MarriageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
