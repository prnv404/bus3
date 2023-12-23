import { Module } from '@nestjs/common';
import { DiscoController } from './disco.controller';
import { DiscoService } from './disco.service';

@Module({
  imports: [],
  controllers: [DiscoController],
  providers: [DiscoService],
})
export class DiscoModule {}
