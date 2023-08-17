import { KafkaListener, TOPIC } from "@prnv404/bus3";
import { Kafka, KafkaMessage } from "kafkajs";
import { container } from "tsyringe";
import { BusPassService } from "../../lib/service/buspass.service";

export interface ADD_BALANCE {
	topic: TOPIC.ADD_BALANCE;
	data: {
		busPassId: string;
		amount: number;
	};
}

const service = container.resolve(BusPassService);

export class ADD_BALANCE_LISTENERS extends KafkaListener<ADD_BALANCE> {
	groupId: string = TOPIC.ADD_BALANCE;

	topic: TOPIC.ADD_BALANCE = TOPIC.ADD_BALANCE;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: ADD_BALANCE["data"], message: KafkaMessage): Promise<void> {
		try {
			const buspass = await service.findById(data.busPassId);

			if (buspass) {
				buspass.balance += data.amount;
				await buspass.save();
			}
		} catch (error) {}
	}
}
