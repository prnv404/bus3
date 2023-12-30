import {
	createUserDto,
	findUserByIdDto,
	otpVerifyDto,
	UserAuthServiceController,
	UserAuthServiceControllerMethods,
	createUserResponse,
	findUserResponse,
	verifyOTPResponse
} from "@app/common";
import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
@UserAuthServiceControllerMethods()
export class AuthController implements UserAuthServiceController {
	constructor(private readonly authService: AuthService) {}

	async createUser(request: createUserDto): Promise<createUserResponse> {
		const { accessToken } = await this.authService.createUser(request as any);
		return { status: 200, message: "sucess", accessToken };
	}
	async findUserById(request: findUserByIdDto): Promise<findUserResponse> {
		const user = await this.authService.findUserById(request.id);
		return { status: 200, message: "sucess", data: user };
	}
	async verifyOtp(request: otpVerifyDto): Promise<verifyOTPResponse> {
		const {accessToken,refreshToken} = await this.authService.verifyOtp(request.userId,request.otp);
		return { status: 200, message: "success", accessToken,refreshToken };
	}
}
