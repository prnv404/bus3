import { KafkaListener, KafkaPublisher, TOPIC } from "@prnv404/bus3";
import { Kafka, KafkaMessage } from "kafkajs";
import { container } from "tsyringe";

export interface ADD_BALANCE {
	topic: TOPIC.ADD_BALANCE;
	data: {
		busPassId: string;
		amount: number;
	};
}

export class ADD_BALANCE_PUBLISHER extends KafkaPublisher<ADD_BALANCE> {
	topic: TOPIC.ADD_BALANCE = TOPIC.ADD_BALANCE;
}
