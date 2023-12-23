import { NestFactory } from '@nestjs/core';
import { OperatorModule } from './operator.module';

async function bootstrap() {
  const app = await NestFactory.create(OperatorModule);
  await app.listen(3000);
}
bootstrap();
