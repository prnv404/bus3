import { Module } from '@nestjs/common';
import { BusPassService } from './bus-pass.service';
import { BusPassController } from './bus-pass.controller';

@Module({
  controllers: [BusPassController],
  providers: [BusPassService],
})
export class BusPassModule {}
