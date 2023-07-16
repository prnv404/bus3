import { Kafka, KafkaMessage } from "kafkajs";
import { KafkaListener, TOPIC } from "@prnv404/bus3";
import admin from "../../config/firebase.config";

interface PushNotificationEvent {
      topic: TOPIC.PUSH_NOTIFICATION;
      data: {
            token: string;
            notification: {
                  title: string;
                  body: string;
            };
      };
}

export class PushNotificatoinListener extends KafkaListener<PushNotificationEvent> {
      groupId: string = TOPIC.PUSH_NOTIFICATION;

      topic: TOPIC.PUSH_NOTIFICATION = TOPIC.PUSH_NOTIFICATION;

      constructor(client: Kafka) {
            super(client);
      }

      async onMessage(data: PushNotificationEvent["data"], message: KafkaMessage): Promise<void> {
            const res = await admin.messaging().send(data);
            console.log(res);
      }
}
