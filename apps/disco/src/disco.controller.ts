import { Controller, Get } from '@nestjs/common';
import { DiscoService } from './disco.service';

@Controller()
export class DiscoController {
  constructor(private readonly discoService: DiscoService) {}

  @Get()
  getHello(): string {
    return this.discoService.getHello();
  }
}
