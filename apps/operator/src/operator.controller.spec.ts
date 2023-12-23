import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

describe('OperatorController', () => {
  let operatorController: OperatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OperatorController],
      providers: [OperatorService],
    }).compile();

    operatorController = app.get<OperatorController>(OperatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(operatorController.getHello()).toBe('Hello World!');
    });
  });
});
