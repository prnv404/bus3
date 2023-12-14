import { CreateCommuterDto, UpdateCommuterDto } from "@app/common";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private readonly database: DatabaseService) {}
	async create(createUserDto: CreateCommuterDto) {
		const data: Prisma.CommuterCreateInput = {
			name: createUserDto.name,
			district: createUserDto.district,
			type: "student",
			phoneNumber: "9567296056"
		};
		const result = await this.database.commuter.create({
			data
		});
		return result;
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
