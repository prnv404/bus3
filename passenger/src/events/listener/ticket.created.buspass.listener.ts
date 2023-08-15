import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC } from "@prnv404/bus3";
import { container } from "tsyringe";
import { PassengerService } from "../../lib/service/passenger.service";

const service = container.resolve(PassengerService);

export interface TICKET_PASS_CREATED {
	topic: TOPIC.TICKET_PASS;
	data: {
		userId: string;
		from: string;
		to: string;
		price: number;
	};
}

export class TicketCreatedEventListiner extends KafkaListener<TICKET_PASS_CREATED> {
	groupId: string = TOPIC.TICKET_PASS;

	topic: TOPIC.TICKET_PASS = TOPIC.TICKET_PASS;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: TICKET_PASS_CREATED["data"], message: KafkaMessage): Promise<void> {
		await service.addTickets(data);
	}
}
