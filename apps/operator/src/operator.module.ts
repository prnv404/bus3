import { Module } from '@nestjs/common';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

@Module({
  imports: [],
  controllers: [OperatorController],
  providers: [OperatorService],
})
export class OperatorModule {}
