import { TicketEventToPvt } from "../../events/publisher/ticket.pvt.publisher";
import { TicketEventToSrt } from "../../events/publisher/ticket.srtc.publisher";
import { autoInjectable } from "tsyringe";
import { kafka_client } from "../../config/kafka.config";

export interface TicketInterface {
	busNo: string;

	price: number;

	OperatorId: string;

	srt: boolean;

	route: string;

	from: string;

	to: string;
}

const ticketToPvt = new TicketEventToPvt(kafka_client);
const ticketToSrt = new TicketEventToSrt(kafka_client);

@autoInjectable()
export class MessageHandler {
	constructor() {}

	async handleMessage(data: TicketInterface) {
		if (data.srt === true) await ticketToSrt.publish(data);
		else await ticketToPvt.publish(data);
	}
}
