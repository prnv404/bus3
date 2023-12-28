import { Controller, Get } from "@nestjs/common";

@Controller('health')
export class GatewayController {
	constructor() {}

	@Get()
	getHello(): string {
		return 'I am okay :)'
	}
}
