import { Test, TestingModule } from '@nestjs/testing';
import { DiscoController } from './disco.controller';
import { DiscoService } from './disco.service';

describe('DiscoController', () => {
  let discoController: DiscoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DiscoController],
      providers: [DiscoService],
    }).compile();

    discoController = app.get<DiscoController>(DiscoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(discoController.getHello()).toBe('Hello World!');
    });
  });
});
