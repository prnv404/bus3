import {
	User,
	createUserDto,
	findUserByIdDto,
	otpVerifyDto,
	responseStatus,
	UserAuthServiceController,
	UserAuthServiceControllerMethods,
	createUserResponse,
	findUserResponse,
	verifyOTPResponse
} from "@app/common";
import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Controller()
@UserAuthServiceControllerMethods()
export class AuthController implements UserAuthServiceController {
	constructor(private readonly authService: AuthService) {}

	async createUser(request: createUserDto): Promise<createUserResponse> {
		const user = await this.authService.createUser(request as any);
		return { status: 200, message: "sucess", data: user };
	}
	async findUserById(request: findUserByIdDto): Promise<findUserResponse> {
		const user = await this.authService.findUserById(request.id);
		return { status: 200, message: "sucess", data: user };
	}
	async verifyOtp(request: otpVerifyDto): Promise<verifyOTPResponse> {
		const isTrue = await this.authService.verifyOtp(request.otp);
		return { status: 200, message: "success", data: { status: isTrue } };
	}
}
