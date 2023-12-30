import { Controller } from "@nestjs/common";
import { BusPassService } from "./bus-pass.service";
import {
	BusPassServiceController,
	BusPassServiceControllerMethods,
	bussPassDto,
	bussPassResponse,
	findBusPassByIdDto,
	updateBusPassDto
} from "@app/common";

@Controller()
@BusPassServiceControllerMethods()
export class BusPassController implements BusPassServiceController {
	constructor(private readonly busPassService: BusPassService) {}
	async createBusPass(request: bussPassDto): Promise<bussPassResponse> {
		const busPass = await this.busPassService.create(request);
		return {
			status: 200,
			message: "sccuess",
			data: busPass
		};
	}

	async findBusPassById(request: findBusPassByIdDto): Promise<bussPassResponse> {
		const busPass = await this.busPassService.findOne(request.id);
		return {
			status: 200,
			message: "success",
			data: busPass
		};
	}
	async updateBusPass(request: updateBusPassDto): Promise<bussPassResponse> {
		const updatedPass = await this.busPassService.update(request.id, request);
		return {
			status: 200,
			message: "success",
			data: updatedPass
		};
	}
}
