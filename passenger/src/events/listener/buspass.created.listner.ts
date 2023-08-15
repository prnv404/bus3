import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC, TicketEventPvt } from "@prnv404/bus3";
import { container } from "tsyringe";
import { PassengerService } from "../../lib/service/passenger.service";

const service = container.resolve(PassengerService);

export interface BUSS_PASS_CREATED {
	topic: TOPIC.BUS_PASS_CREATED;
	data: {
		userId: string;
		busPassId: string;
	};
}

export class BusPassCreatedEventListener extends KafkaListener<BUSS_PASS_CREATED> {
	groupId: string = TOPIC.BUS_PASS_CREATED;

	topic: TOPIC.BUS_PASS_CREATED = TOPIC.BUS_PASS_CREATED;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: BUSS_PASS_CREATED["data"], message: KafkaMessage): Promise<void> {
		await service.addBusPassId(data.userId, data.busPassId);
	}
}
