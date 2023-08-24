import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC } from "@prnv404/bus3";
import { container } from "tsyringe";
import { TicketUseCase } from "../../lib/usecase/ticket/ticket-usecase";

const Service = container.resolve(TicketUseCase);

export interface TicketEventPvt {
	topic: TOPIC.TICKET_CREATED_PVT;
	data: {
		busNo: string;
		price: number;
		operatorId: string;
		route: string;
		from: string;
		to: string;
	};
}
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
