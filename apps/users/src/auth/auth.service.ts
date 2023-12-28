import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { createUserDto } from "@app/common";

@Injectable()
export class AuthService {
	constructor(private readonly database: DatabaseService) {}

	async createUser(userData: Prisma.UserCreateInput) {
		const user = await this.database.user.create({ data: userData });
		return user;
	}

	async findUserById(id: string) {
		return await this.database.user.findFirst({
			where: {
				id
			}
		});
	}

	async verifyOtp(otp: string) {
		return true;
	}
}
