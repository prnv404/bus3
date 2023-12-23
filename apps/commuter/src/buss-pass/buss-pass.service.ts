import { Injectable } from '@nestjs/common';
import { CreateBussPassDto } from './dto/create-buss-pass.dto';
import { UpdateBussPassDto } from './dto/update-buss-pass.dto';

@Injectable()
export class BussPassService {
  create(createBussPassDto: CreateBussPassDto) {
    return 'This action adds a new bussPass';
  }

  findAll() {
    return `This action returns all bussPass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bussPass`;
  }

  update(id: number, updateBussPassDto: UpdateBussPassDto) {
    return `This action updates a #${id} bussPass`;
  }

  remove(id: number) {
    return `This action removes a #${id} bussPass`;
  }
}
