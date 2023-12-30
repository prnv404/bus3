import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
@Injectable()
export class AuthService {
	constructor(
		private readonly database: DatabaseService,
		private readonly jwtService: JwtService
	) {}

	async createUser(userData: Prisma.UserCreateInput) {
		let user = await this.database.user.findFirst({
			where: {
			phone:{equals:userData.phone}
			}
		})
		if (user) {
			throw new RpcException('400:Phone Number Already Exist')
		}
		// hard coding otp for better dev experience
		 user = await this.database.user.create({ data: { ...userData, otp: "123456" } });
		const payload = {
			userId: user.id,
			phone: user.phone,
			isVerified: user.isVerified
		};
		return {
			accessToken: this.jwtService.sign(payload)
		};
	}

	async findUserById(id: string) {
		return await this.database.user.findFirst({
			where: {
				id
			}
		});
	}

	async verifyOtp(userId: string, otp: string) {
		const user = await this.database.user.findFirst({ where: { id: userId } });
		if (user.otp === otp) {
			await this.database.user.update({ where: { id: userId }, data: { isVerified: true } });
			const payload = {
				userId: user.id,
				phone: user.phone,
				isVerified: user.isVerified
			};
			return {
				accessToken: this.jwtService.sign(payload),
				refreshToken: this.jwtService.sign(payload)
			};
		} else {
			throw new RpcException({ statusCode: HttpStatus.BAD_REQUEST, message: "Incorret OTP " });
		}
	}
}
