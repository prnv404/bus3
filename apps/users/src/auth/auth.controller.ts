import {
	User,
	createUserDto,
	findUserByIdDto,
	otpVerifyDto,
	responseStatus,
	UserAuthServiceController,
	UserAuthServiceControllerMethods
} from "@app/common";
import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
@UserAuthServiceControllerMethods()
export class AuthController implements UserAuthServiceController {
	constructor(private readonly authService: AuthService) {}

	async createUser(request: createUserDto): Promise<User> {
		return await this.authService.createUser(request as any);
	}
	async findUserById(request: findUserByIdDto): Promise<User> {
		return await this.authService.findUserById(request.id);
	}
	async verifyOtp(request: otpVerifyDto): Promise<responseStatus> {
		const result = await this.authService.verifyOtp(request.otp);
		return { status: result };
	}
}
