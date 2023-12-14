/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "commuter";

export interface UpdateCommuterDto {
	id: string;
	name: string;
	district: string;
	type: string;
	isVerified: string;
}

export interface FindOneCommuterDto {
	id: string;
}

export interface Empty {}

export interface CreateCommuterDto {
	name: string;
	district: string;
	type: string;
}

export interface Commuter {
	name: string;
	type: string;
	district: string;
}

export const COMMUTER_PACKAGE_NAME = "commuter";

export interface CommuterServiceClient {
	create(request: CreateCommuterDto): Observable<Commuter>;

	findAll(request: Empty): Observable<Commuter>;

	findOne(request: FindOneCommuterDto): Observable<Commuter>;

	update(request: UpdateCommuterDto): Observable<Commuter>;

	remove(request: FindOneCommuterDto): Observable<Commuter>;
}

export interface CommuterServiceController {
	create(request: CreateCommuterDto): Promise<Commuter> | Observable<Commuter> | Commuter;

	findAll(request: Empty): Promise<Commuter> | Observable<Commuter> | Commuter;

	findOne(request: FindOneCommuterDto): Promise<Commuter> | Observable<Commuter> | Commuter;

	update(request: UpdateCommuterDto): Promise<Commuter> | Observable<Commuter> | Commuter;

	remove(request: FindOneCommuterDto): Promise<Commuter> | Observable<Commuter> | Commuter;
}

export function CommuterServiceControllerMethods() {
	return function (constructor: Function) {
		const grpcMethods: string[] = ["create", "findAll", "findOne", "update", "remove"];
		for (const method of grpcMethods) {
			const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
			GrpcMethod("CommuterService", method)(constructor.prototype[method], method, descriptor);
		}
		const grpcStreamMethods: string[] = [];
		for (const method of grpcStreamMethods) {
			const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
			GrpcStreamMethod("CommuterService", method)(constructor.prototype[method], method, descriptor);
		}
	};
}

export const COMMUTER_SERVICE_NAME = "CommuterService";
