import { Controller, Get } from '@nestjs/common';
import { OperatorService } from './operator.service';

@Controller()
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Get()
  getHello(): string {
    return this.operatorService.getHello();
  }
}
