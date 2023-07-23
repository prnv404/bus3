import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC, TicketEventPvt } from "@prnv404/bus3";
import { container } from "tsyringe";
import { TicketService } from "../../lib/service/ticket.service";

const Service = container.resolve(TicketService);

export class TicketCreatedEventListener extends KafkaListener<TicketEventPvt> {
	groupId: string = TOPIC.TICKET_CREATED_PVT;

	topic: TOPIC.TICKET_CREATED_PVT = TOPIC.TICKET_CREATED_PVT;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: TicketEventPvt["data"], message: KafkaMessage): Promise<void> {
		try {
			await Service.Create(data);
		} catch (error) {
			console.log(error);
		}
	}
}
