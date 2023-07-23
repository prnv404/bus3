import { KafkaPublisher, TOPIC, TicketEventSrt } from "@prnv404/bus3";

export class TicketEventToSrt extends KafkaPublisher<TicketEventSrt> {
	topic: TOPIC.TICKET_CREATED_SRT = TOPIC.TICKET_CREATED_SRT;
}
