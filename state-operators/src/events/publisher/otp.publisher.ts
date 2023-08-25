import { KafkaPublisher, TOPIC, OTPEvent } from "@prnv404/bus3";

export class SENDOTPNOTIFICATION extends KafkaPublisher<OTPEvent> {
	topic: TOPIC.OTP = TOPIC.OTP;
}
