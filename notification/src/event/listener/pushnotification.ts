import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC, PushNotificationEvent, CustomError } from "@prnv404/bus3";
import admin from "../../config/firebase.config";
import { PushNotificationRepository } from "../../lib/database/repository/pushnotfication.repository";

const pushNotificationRepository = new PushNotificationRepository();
export class PushNotificatoinListener extends KafkaListener<PushNotificationEvent> {
	groupId: string = TOPIC.PUSH_NOTIFICATION;

	topic: TOPIC.PUSH_NOTIFICATION = TOPIC.PUSH_NOTIFICATION;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: PushNotificationEvent["data"], message: KafkaMessage): Promise<void> {
		await admin.messaging().send(data).catch(console.log);
		await pushNotificationRepository.create(data).catch(console.log);
	}
}
