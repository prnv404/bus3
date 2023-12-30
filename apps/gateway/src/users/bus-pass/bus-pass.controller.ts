import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusPassService } from './bus-pass.service';
import { bussPassDto, updateBusPassDto } from '@app/common';

@Controller('buspass')
export class BusPassController {
  constructor(private readonly busPassService: BusPassService) {}

  @Post()
  create(@Body() createBusPassDto:bussPassDto ) {
    return this.busPassService.create(createBusPassDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busPassService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusPassDto: updateBusPassDto) {
    return this.busPassService.update(id, updateBusPassDto);
  }

 
}
