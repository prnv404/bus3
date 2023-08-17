import { KafkaListener, TOPIC } from "@prnv404/bus3";
import { Kafka, KafkaMessage } from "kafkajs";
import { container } from "tsyringe";
import { BusPassService } from "../../lib/service/buspass.service";

export interface ACTIVATE_PASS {
	topic: TOPIC.PAYMENT_SUCCESS;
	data: {
		passengerId: string;
		busPassId: string;
		orderId: string;
		status: string;
	};
}

const service = container.resolve(BusPassService);

export class ACTIVATE_PASS_LISTENER extends KafkaListener<ACTIVATE_PASS> {
	groupId: string = TOPIC.PAYMENT_SUCCESS;

	topic: TOPIC.PAYMENT_SUCCESS = TOPIC.PAYMENT_SUCCESS;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: ACTIVATE_PASS["data"], message: KafkaMessage): Promise<void> {
		const busPass = await service.findById(data.busPassId);
		if (busPass) {
			busPass.isActive = true;
			await busPass.save();
		}
	}
}
