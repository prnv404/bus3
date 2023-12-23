import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BussPassService } from './buss-pass.service';
import { CreateBussPassDto } from './dto/create-buss-pass.dto';
import { UpdateBussPassDto } from './dto/update-buss-pass.dto';

@Controller()
export class BussPassController {
  constructor(private readonly bussPassService: BussPassService) {}

  @MessagePattern('createBussPass')
  create(@Payload() createBussPassDto: CreateBussPassDto) {
    return this.bussPassService.create(createBussPassDto);
  }

  @MessagePattern('findAllBussPass')
  findAll() {
    return this.bussPassService.findAll();
  }

  @MessagePattern('findOneBussPass')
  findOne(@Payload() id: number) {
    return this.bussPassService.findOne(id);
  }

  @MessagePattern('updateBussPass')
  update(@Payload() updateBussPassDto: UpdateBussPassDto) {
    return this.bussPassService.update(updateBussPassDto.id, updateBussPassDto);
  }

  @MessagePattern('removeBussPass')
  remove(@Payload() id: number) {
    return this.bussPassService.remove(id);
  }
}
