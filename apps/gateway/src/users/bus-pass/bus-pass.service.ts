import { BUS_PASS_SERVICE_NAME, BusPassServiceClient, bussPassDto, updateBusPassDto } from "@app/common";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class BusPassService implements OnModuleInit {
	private busPassService: BusPassServiceClient;

	constructor(@Inject(BUS_PASS_SERVICE_NAME) private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.busPassService = this.client.getService<BusPassServiceClient>(BUS_PASS_SERVICE_NAME);
	}

	create(createBusPassDto: bussPassDto) {
		return this.busPassService.createBusPass(createBusPassDto);
	}

	findOne(id: string) {
		return this.busPassService.findBusPassById({ id });
	}

	update(id: string, updateBusPassDto: updateBusPassDto) {
		return this.busPassService.updateBusPass({ id, ...updateBusPassDto });
	}

	
}
