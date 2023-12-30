import { USER_AUTH_SERVICE_NAME, createUserDto, UserAuthServiceClient } from "@app/common";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AuthService implements OnModuleInit {
	private userservice: UserAuthServiceClient;

	constructor(@Inject(USER_AUTH_SERVICE_NAME) private client: ClientGrpc) {}

	onModuleInit() {
		this.userservice = this.client.getService<UserAuthServiceClient>(USER_AUTH_SERVICE_NAME);
	}

	create(createAuthDto: createUserDto) {
		return this.userservice.createUser(createAuthDto);
	}

	findOne(id: string) {
		return this.userservice.findUserById({ id });
	}

	verifyOTP(userId:string,otp: string) {
		return this.userservice.verifyOtp({ userId,otp });
	}
}
