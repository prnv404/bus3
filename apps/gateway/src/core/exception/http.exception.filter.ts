import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { RpcException } from "@nestjs/microservices";

export interface IRpcException {
	message: string;
	status: number;
}

@Catch()
export class AllGlobalExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
	catch(exception: RpcException | HttpException, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();
		const httpStatus = +exception.message.split(":")[1].trim();
		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			message: exception.message.split(":")[2]
		};
		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
