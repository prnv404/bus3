import { Ticket, TicketAttrs } from "../models/ticket.model";

export class TicketRepository {
	constructor() {}

	async Create(data: TicketAttrs) {
		const ticket = await Ticket.build(data).save();

		return ticket;
	}

	async findById(id: string) {
		const ticket = await Ticket.findById(id);

		return ticket;
	}

	async findByAllTicket(OperatorId: string) {
		const tickets = await Ticket.find({ OperatorId });

		return tickets;
	}
}
