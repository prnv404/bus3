import { KafkaPublisher, TOPIC } from "@prnv404/bus3";

export interface ACTIVATE_PASS {
	topic: TOPIC.PAYMENT_SUCCESS;
	data: {
		passengerId: string;
		busPassId: string;
		orderId: string;
		status: string;
	};
}

export class ACTIVATE_BUSS_PASS extends KafkaPublisher<ACTIVATE_PASS> {
	topic: TOPIC.PAYMENT_SUCCESS = TOPIC.PAYMENT_SUCCESS;
}
