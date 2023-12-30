/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface findBusPassByIdDto {
  id: string;
}

export interface bussPassDto {
  id: string;
  from: string;
  to: string;
  userId: string;
  balance: number;
  isActive: boolean;
}

export interface updateBusPassDto {
  id: string;
  from: string;
  to: string;
  userId: string;
  balance: number;
  isActive: boolean;
}

export interface bussPassResponse {
  status: number;
  message: string;
  data: bussPassDto | undefined;
}

export interface createUserResponse {
  status: number;
  message: string;
  accessToken: string;
}

export interface findUserResponse {
  status: number;
  message: string;
  data: User | undefined;
}

export interface verifyOTPResponse {
  status: number;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface otpVerifyDto {
  userId: string;
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

export interface BusPassServiceClient {
  createBusPass(request: bussPassDto): Observable<bussPassResponse>;

  findBusPassById(request: findBusPassByIdDto): Observable<bussPassResponse>;

  updateBusPass(request: updateBusPassDto): Observable<bussPassResponse>;
}

export interface BusPassServiceController {
  createBusPass(request: bussPassDto): Promise<bussPassResponse> | Observable<bussPassResponse> | bussPassResponse;

  findBusPassById(
    request: findBusPassByIdDto,
  ): Promise<bussPassResponse> | Observable<bussPassResponse> | bussPassResponse;

  updateBusPass(request: updateBusPassDto): Promise<bussPassResponse> | Observable<bussPassResponse> | bussPassResponse;
}

export function BusPassServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createBusPass", "findBusPassById", "updateBusPass"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BusPassService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BusPassService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BUS_PASS_SERVICE_NAME = "BusPassService";
