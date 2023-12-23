import { Injectable } from '@nestjs/common';

@Injectable()
export class OperatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
