import { NestFactory } from '@nestjs/core';
import { DiscoModule } from './disco.module';

async function bootstrap() {
  const app = await NestFactory.create(DiscoModule);
  await app.listen(3000);
}
bootstrap();
