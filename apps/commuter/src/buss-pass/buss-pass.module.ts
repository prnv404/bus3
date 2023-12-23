import { Module } from '@nestjs/common';
import { BussPassService } from './buss-pass.service';
import { BussPassController } from './buss-pass.controller';

@Module({
  controllers: [BussPassController],
  providers: [BussPassService],
})
export class BussPassModule {}
