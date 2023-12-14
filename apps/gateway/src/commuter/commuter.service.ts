import { COMMUTER_SERVICE_NAME, CommuterServiceClient, CreateCommuterDto, UpdateCommuterDto } from "@app/common";
import { Injectable, OnModuleInit, Inject } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class CommuterService implements OnModuleInit {
  private commuteService:CommuterServiceClient
	constructor(@Inject(COMMUTER_SERVICE_NAME) private client: ClientGrpc) {}
  onModuleInit() {
    this.commuteService = this.client.getService<CommuterServiceClient>(COMMUTER_SERVICE_NAME)
  }

	create(createCommuterDto: CreateCommuterDto) {
		return this.commuteService.create(createCommuterDto)
	}

	findAll() {
		return `This action returns all commuter`;
	}

	findOne(id: number) {
		return `This action returns a #${id} commuter`;
	}

	update(id: number, updateCommuterDto: UpdateCommuterDto) {
		return `This action updates a #${id} commuter`;
	}

	remove(id: number) {
		return `This action removes a #${id} commuter`;
	}
}
