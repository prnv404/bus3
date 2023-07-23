import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC, TicketEventSrt } from "@prnv404/bus3";
import { container } from "tsyringe";
import { TicketService } from "../../lib/service/ticket.service";

const Service = container.resolve(TicketService);

export class TicketListener extends KafkaListener<TicketEventSrt> {
	groupId: string = TOPIC.TICKET_CREATED_SRT;

	topic: TOPIC.TICKET_CREATED_SRT = TOPIC.TICKET_CREATED_SRT;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: TicketEventSrt["data"], message: KafkaMessage): Promise<void> {
		await Service.create(data);
	}
}
