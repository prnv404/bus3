import { PushNotification, PushNotificationAttrs } from "../model/push.notification.model";

export class PushNotificationRepository {
	async create(data: PushNotificationAttrs) {
		const result = await PushNotification.build(data).save();
		return result;
	}
}
