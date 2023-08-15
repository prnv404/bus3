import { KafkaPublisher, TOPIC } from "@prnv404/bus3";

export interface TICKET_PASS_CREATED {
	topic: TOPIC.TICKET_PASS;
	data: {
		userId: string;
		from: string;
		to: string;
		price: number;
	};
}

export class PUBLISH_TICKET_CREATED extends KafkaPublisher<TICKET_PASS_CREATED> {
	topic: TOPIC.TICKET_PASS = TOPIC.TICKET_PASS;
}
