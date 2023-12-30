import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class BusPassService {
	constructor(private readonly database: DatabaseService) {}

	async create(busPassDto: Prisma.BusPassCreateInput) {
		const buspass = await this.database.busPass.create({ data: busPassDto });
		return buspass;
	}

	async findOne(id: string) {
		return await this.database.busPass.findFirst({ where: { id } });
	}

	async update(id: string, updateBusPassDto: Prisma.BusPassUpdateInput) {
		return await this.database.busPass.update({ where: { id }, data: updateBusPassDto });
	}

}
