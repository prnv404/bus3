import { KafkaPublisher, TOPIC } from "@prnv404/bus3";

export interface PASS_ORDER_CREATED {
	topic: TOPIC.PASS_ORDER_CREATED;
	data: {
		userId: string;
		busPassId: string;
		amount: number;
		paymentId: string;
		addBalance: boolean;
	};
}
export class PUBLISH_PASS_ORDER extends KafkaPublisher<PASS_ORDER_CREATED> {
	topic: TOPIC.PASS_ORDER_CREATED = TOPIC.PASS_ORDER_CREATED;
}
