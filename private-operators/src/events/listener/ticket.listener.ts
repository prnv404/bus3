import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC, TicketEvent } from "@prnv404/bus3";
import { container } from "tsyringe";
import { TicketService } from "../../lib/service/ticket.service";

const Service = container.resolve(TicketService);

export class TicketCreatedEvent extends KafkaListener<TicketEvent> {
	groupId: string = TOPIC.TICKET_CREATED;

	topic: TOPIC.TICKET_CREATED = TOPIC.TICKET_CREATED;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: TicketEvent["data"], message: KafkaMessage): Promise<void> {
		try {
			await Service.Create(data);
		} catch (error) {}
	}
}
