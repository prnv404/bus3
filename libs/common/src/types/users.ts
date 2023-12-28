/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'users';

export interface User {
  id: string;
  name: string;
  phone: string;
  district: string;
  accessToken: string;
  refreshToken: string;
}

export interface createUserDto {
  name: string;
  phone: string;
  district: string;
}

export interface findUserByIdDto {
  id: string;
}

export const USERS_PACKAGE_NAME = 'users';

export interface userServiceClient {
  createUser(request: createUserDto): Observable<User>;

  findUserById(request: findUserByIdDto): Observable<User>;
}

export interface userServiceController {
  createUser(request: createUserDto): Promise<User> | Observable<User> | User;

  findUserById(
    request: findUserByIdDto,
  ): Promise<User> | Observable<User> | User;
}

export function userServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createUser', 'findUserById'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('userService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('userService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'userService';
