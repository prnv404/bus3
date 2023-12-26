import { CreateCommuterDto, UpdateCommuterDto } from "@app/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	create(createUserDto: CreateCommuterDto) {
		return {
			...createUserDto
		};
	}

	findAll() {
		return `This action returns all user`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: string, updateUserDto: UpdateCommuterDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
