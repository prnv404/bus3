import { PartialType } from '@nestjs/mapped-types';
import { CreateBussPassDto } from './create-buss-pass.dto';

export class UpdateBussPassDto extends PartialType(CreateBussPassDto) {
  id: number;
}
