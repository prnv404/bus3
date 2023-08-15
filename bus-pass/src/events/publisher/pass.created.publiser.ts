import { KafkaPublisher, TOPIC } from "@prnv404/bus3";

export interface BUSS_PASS_CREATED {
	topic: TOPIC.BUS_PASS_CREATED;
	data: {
		userId: string;
		busPassId: string;
	};
}

export class PUBLISH_BUSSPASS_CREATED extends KafkaPublisher<BUSS_PASS_CREATED> {
	topic: TOPIC.BUS_PASS_CREATED = TOPIC.BUS_PASS_CREATED;
}
