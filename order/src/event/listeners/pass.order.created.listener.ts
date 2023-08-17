import { KafkaListener, TOPIC } from "@prnv404/bus3";
import { Kafka, KafkaMessage } from "kafkajs";
import { container } from "tsyringe";
import { OrderService } from "../../lib/service/order.service";

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

const Service = container.resolve(OrderService);

export class BusPassOrderCreatedEvent extends KafkaListener<PASS_ORDER_CREATED> {
	groupId: string = TOPIC.PASS_ORDER_CREATED;

	topic: TOPIC.PASS_ORDER_CREATED = TOPIC.PASS_ORDER_CREATED;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: PASS_ORDER_CREATED["data"], message: KafkaMessage): Promise<void> {
		console.log(data);
		try {
			await Service.createOrder({
				paymentId: data.paymentId,
				amount: data.amount,
				busPassId: data.busPassId,
				passengerId: data.userId,
				status: "PENDING",
				addBalance: data.addBalance
			});
		} catch (error) {}
	}
}
