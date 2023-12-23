import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscoService {
  getHello(): string {
    return 'Hello World!';
  }
}
