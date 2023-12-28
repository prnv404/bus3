/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface createUserResponse {
  status: number;
  message: string;
  data: User | undefined;
}

export interface findUserResponse {
  status: number;
  message: string;
  data: User | undefined;
}

export interface verifyOTPResponse {
  status: number;
  message: string;
  data: responseStatus | undefined;
}

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
  createUser(request: createUserDto): Observable<createUserResponse>;

  findUserById(request: findUserByIdDto): Observable<findUserResponse>;

  verifyOtp(request: otpVerifyDto): Observable<verifyOTPResponse>;
}

export interface UserAuthServiceController {
  createUser(request: createUserDto): Promise<createUserResponse> | Observable<createUserResponse> | createUserResponse;

  findUserById(request: findUserByIdDto): Promise<findUserResponse> | Observable<findUserResponse> | findUserResponse;

  verifyOtp(request: otpVerifyDto): Promise<verifyOTPResponse> | Observable<verifyOTPResponse> | verifyOTPResponse;
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
