import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
export interface IRpcException {
	message: string;
	status: number;
}

export class FitRpcException extends RpcException implements IRpcException {
	constructor(message: string, statusCode: HttpStatus) {
		super(message);
		this.initStatusCode(statusCode);
	}
	public status: number;

	private initStatusCode(statusCode) {
		this.status = statusCode;
	}
}
