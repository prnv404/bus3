import { KafkaPublisher, TOPIC, TicketEventPvt } from "@prnv404/bus3";

export class TicketEventToPvt extends KafkaPublisher<TicketEventPvt> {
	topic: TOPIC.TICKET_CREATED_PVT = TOPIC.TICKET_CREATED_PVT;
}
