/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface responseStatus {
	status: boolean;
}

export interface otpVerifyDto {
	otp: string;
}

export interface User {
	id: string;
	name: string;
	phone: string;
	district: string;
	accessToken: string;
	refreshToken: string;
	type: string;
}

export interface createUserDto {
	name: string;
	phone: string;
	district: string;
	isStudent: string;
	type: string;
}

export interface findUserByIdDto {
	id: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UserAuthServiceClient {
	createUser(request: createUserDto): Observable<User>;

	findUserById(request: findUserByIdDto): Observable<User>;

	verifyOtp(request: otpVerifyDto): Observable<responseStatus>;
}

export interface UserAuthServiceController {
	createUser(request: createUserDto): Promise<User> | Observable<User> | User;

	findUserById(request: findUserByIdDto): Promise<User> | Observable<User> | User;

	verifyOtp(request: otpVerifyDto): Promise<responseStatus> | Observable<responseStatus> | responseStatus;
}

export function UserAuthServiceControllerMethods() {
	return function (constructor: Function) {
		const grpcMethods: string[] = ["createUser", "findUserById", "verifyOtp"];
		for (const method of grpcMethods) {
			const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
			GrpcMethod("UserAuthService", method)(constructor.prototype[method], method, descriptor);
		}
		const grpcStreamMethods: string[] = [];
		for (const method of grpcStreamMethods) {
			const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
			GrpcStreamMethod("UserAuthService", method)(constructor.prototype[method], method, descriptor);
		}
	};
}

export const USER_AUTH_SERVICE_NAME = "UserAuthService";
